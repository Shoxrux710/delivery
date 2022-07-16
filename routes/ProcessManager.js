const {Router} = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const ProcessManager = require('../models/ProcessManager')
const ProcessDate = require('../models/ProcessDate')
const mongoose = require('mongoose')
const nowDate = require('../utils/nowDate')
const router = Router()


// bashqaruvchi adminga berish

router.post('/manager', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('BB'), async (req, res) => {

    const { id } = req.user
    const { date } = nowDate()

    const session = await mongoose.startSession()
    session.startTransaction()

    try {

        const { processId } = req.body

        const processOne = await ProcessDate
            .find({ isRefusal: false, userId: id, toStatus: 'processAdmin' })
            .populate('processManagerId', 'processId')
            .select('processManagerId')

        let chequeAll = []

        processOne
            .map((p) => p.processManagerId.processId)
            .forEach((value) => {
                chequeAll = [...chequeAll, ...value]
            })

        console.log(chequeAll)

        const isCheque = await ProcessManager.findOne({_id: {$in: chequeAll}})
        if (isCheque) 
                return res.status(500).json({errorMessage: 'Yuborilgan buyurtma qayta yuborilmasin'})

        const processManager = new ProcessManager({
            managerId: id,
            processId,
        })

        const { _id: newProcessId } = await processManager.save({ session })

        const dataProcess = new ProcessDate({
            fromStatus: 'inManager',    
            toStatus: 'processAdmin',
            date: date,
            userId: id,
            processManagerId: newProcessId
        })

        await dataProcess.save({ session })
        await session.commitTransaction()
        res.status(200).json({ successMessage: 'buyurtmani adminga berish' })

    } catch (err) {
        await session.abortTransaction()
        res.status(400).json({ errorMessage: 'error server' })
    }

    session.endSession()
})

module.exports = router