const { Router } = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const ProcessManager = require('../models/ProcessManager')
const Process = require('../models/Process')
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

        const { processDates } = req.body

        const processDateIds = await ProcessDate
            .find({ isRefusal: false, userId: id, toStatus: 'processAdmin' })
            .populate({ path: 'processManagerId', select: '', populate: { path: 'processDates', select: 'processId' } })
            .select('processManagerId')

        let proccessIds2 = []

        processDateIds
            .forEach((value) => {
                proccessIds2 = [...proccessIds2, ...value.processManagerId?.processDates]
            })
        const processIds = proccessIds2.map((pid) => pid.processId);

        const isProcessIds = await Process.findOne({_id: {$in: processIds}})

        if (isProcessIds)
           return res.status(500).json({errorMessage: 'Yuborilgan buyurtma qaytadan yuborilmasin'})

        const processManager = new ProcessManager({
            managerId: id,
            processDates,
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

// admin tasdiqlash

router.put('/adminIn', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AA'), async (req, res) => {

    const { id } = req.query
    const { id: userId } = req.user
    const { date } = nowDate()

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const managerOne = await ProcessManager.findOne({ _id: id })
        managerOne.status = 'admin'

        await managerOne.save({ session })

        const dateManager = new ProcessDate({
            fromStatus: 'processAdmin',
            toStatus: 'admin',
            date: date,
            userId: userId,
            processManagerId: id
        })

        await dateManager.save({ session })
        await session.commitTransaction()
        res.status(200).json({ successMessage: 'Admin tasdiqlash' })

    } catch (err) {
        await session.abortTransaction()
        res.status(200).json({ errorMessage: 'error' })
    }

    session.endSession()
})

module.exports = router