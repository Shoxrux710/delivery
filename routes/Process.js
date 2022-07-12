const { Router } = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const Process = require('../models/Process')
const ProcessDate = require('../models/ProcessDate')
const nowDate = require('../utils/nowDate')
const mongoose = require('mongoose');
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

router.post('/all', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('COUR'), async  (req,res) => {

    console.log(req.body)
    const {id} = req.user
    const {date} = nowDate()
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { cheques } = req.body

        const process = new Process({
            courierId: id,
            cheques
        })

        const {_id: newProcessId} = await process.save({session})

        const dateProcess = new ProcessDate({
            fromStatus: 'inCour',
            toStatus: 'process-Cour',
            date: date,
            userId: id,
            processId: newProcessId
        })

        await dateProcess.save({session})
        await session.commitTransaction()
        res.status(200).json({ successMessage: `buyurtmani boshqaruvchiga berish` })
        
    } catch (err) {
        await session.abortTransaction()
        res.status(500).json({ errorMessage: 'server error' })
    }

    session.endSession()

})



module.exports = router