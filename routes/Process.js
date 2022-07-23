const { Router } = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const Process = require('../models/Process')
const ProcessDate = require('../models/ProcessDate')
const nowDate = require('../utils/nowDate')
const mongoose = require('mongoose');
const Cheque = require('../models/Cheque');
const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *   Process:
 *     type: object
 *     properties:
 *       cheques:
 *          type: array
 *     required:
 *         - cheques
 */

/**
 * @swagger
 * /api/process/all:
 *  post:
 *   summary: buyurtmani boshqaruvchiga berish
 *   tags: [Process]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *          schema:
 *             type: object
 *             $ref: "#/components/schemas/Process"
 *   security:
 *     - bearerAuth: []
 *   responses:
 *       200:
 *         description: response 200   
 *       400:
 *         description: response 400
 *       500:
 *         description: response 500 
 */

// kuryer boshqaruvchiga berish

router.post('/cour', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('COUR'), async (req, res) => {

    const { id } = req.user
    const { date } = nowDate()
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { cheques } = req.body
        
        const test = await Process.aggregate([
            {
                '$match': {
                  'courierId': mongoose.Types.ObjectId(id)
                }
            },
            {
              '$unwind': '$cheques'
            }, {
              '$match': {
                'cheques': { '$in': cheques }
              }
            }
          ])

        console.log(test); 

        // const processOne = await ProcessDate
        //     .find({ isRefusal: false, userId: id, toStatus: 'process-Cour' })
        //     .populate('processId', 'cheques')
        //     .select('processId')

        // let chequeAll = [];
        // console.log(processOne);
        // processOne
        //     .map((p) => p.processId.cheques)
        //     .forEach((value) => {
        //         chequeAll = [...chequeAll, ...value]
        //     });
        // console.log(chequeAll);
        // const isCheque = await Cheque.findOne({ _id: { $in: chequeAll } });
        // console.log(isCheque);
        if (test.length)
            return res.status(400).json({errorMessage: 'Yuborilgan buyurtma qaytadan yuborilmasin'});

        const process = new Process({
            courierId: id,
            cheques
        })

        const { _id: newProcessId } = await process.save({ session })

        const dateProcess = new ProcessDate({
            fromStatus: 'inCour',
            toStatus: 'process-Cour',
            date: date,
            userId: id,
            processId: newProcessId
        })

        await dateProcess.save({ session })


        await session.commitTransaction()
        res.status(200).json({ successMessage: `buyurtmani boshqaruvchiga berish` })

    } catch (err) {
        await session.abortTransaction()
        res.status(500).json({ errorMessage: 'server error' })
        console.log(err)
    }

    session.endSession()

})


// manager tasdiqlash

router.put('/managerIn', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('BB'), async (req, res) => {

    const { id } = req.query
    const { id: userId } = req.user
    const { date } = nowDate()

    console.log(id)

    const session = await mongoose.startSession()
    session.startTransaction()

    try {

        const processOneId = await Process.findOne({_id: id})
        processOneId.status = 'inManager'

        await processOneId.save({session})

        const dateProcess = new ProcessDate({
            fromStatus: 'process-Cour',
            toStatus: 'inManager',
            date: date,
            userId: userId,
            processId: id
        })

        await dateProcess.save({ session })
        await session.commitTransaction()
        res.status(200).json({ successMessage: 'Bashqaruvchi tasdiqladi' })

    } catch (err) {
        console.log(err)
        await session.abortTransaction()
        res.status(500).json({ errorMessage: 'error' })
    }

    session.endSession()

})


// boshqaruvchi rad etishi

router.put('/rejectionCour', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('BB'), async (req, res) => {

    const { id } = req.query

    ProcessDate.findById(id, async (err, processDateOne) => {
        if (err) return res.status(400).json({ errorMessage: 'error server' })
        processDateOne.isRefusal = true
        await processDateOne.save()
        res.status(200).json({ successMessage: 'Bashqaruvchi rad etish' })
    })
})

module.exports = router