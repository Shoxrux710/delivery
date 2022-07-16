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

    console.log(req.body)
    const { id } = req.user
    const { date } = nowDate()
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { cheques } = req.body

        const processOne = await ProcessDate
            .find({ isRefusal: false, userId: id, toStatus: 'process-Cour' })
            .populate('processId', 'cheques')
            .select('processId')

        let chequeAll = [];

        processOne
            .map((p) => p.processId.cheques)
            .forEach((value) => {
                chequeAll = [...chequeAll, ...value]
            });

        const isCheque = await Cheque.findOne({ _id: { $in: chequeAll } });
        if (isCheque)
            return res.status(400).json('Yuborilgan buyurtma qaytadan yuborilmasin');

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
        // Process.findById(id, (err, processOne) => {
            
        //     if (err) return res.status(200).json({ errorMessage: 'error server' })
        //     processOne.status = 'inManager'
        //     await processOne.save({ session })
        //     console.log(processOne)
        // })

        processOneId.save({session})

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
        res.status(500).json({ successMessage: 'error' })
    }

    session.endSession()

})



module.exports = router