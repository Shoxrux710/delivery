const { Router } = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const ProcessManager = require('../models/ProcessManager')
const ProcessDate = require('../models/ProcessDate')
const Process = require('../models/Process')
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

        const processDateIds = await ProcessDate
            .find({ isRefusal: false, userId: id, toStatus: 'processAdmin' })
            .populate('processManagerId', 'processId')
            .select('processManagerId')

        let proccessIds2 = []

        processDateIds
            .map(p => p.processManagerId.processId)
            .forEach((value) => {
                proccessIds2 = [...proccessIds2, ...value]
            })

        const isProcessId = await Process.findOne({_id: {$in: proccessIds2}})

        if (isProcessId)
            return res.status(400).json({errorMessage: 'Yuborilgan buyurtma qaytadan yuborilmasin'});

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


// admin rad etish

router.put('/rejectionAdmin', (req, res) => {

    const { id } = req.query

    ProcessDate.findById(id, async (err, processDateOne) => {
        if (err) return res.status(400).json({ errorMessage: 'error server' })
        processDateOne.isRefusal = true
        await processDateOne.save()
        res.status(200).json({ successMessage: 'admin rad etish' })
    })
})

// admindagi arxivlar

router.get('/eachAdmin', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AA'), async (req, res) => {

    const eachAdmin = await ProcessDate.aggregate(
        [{
            $lookup: {
                from: 'processmanagers',
                localField: 'processManagerId',
                foreignField: '_id',
                as: 'processManagerId'
            }
        }, {
            $unwind: '$processManagerId'
        }, {
            $match: {
                'processManagerId.status': 'admin'
            }
        }, {
            $unwind: '$processManagerId.processId'
        }, {
            $lookup: {
                from: 'processes',
                localField: 'processManagerId.processId',
                foreignField: '_id',
                as: 'processManagerId.processId'
            }
        }, {
            $unwind: '$processManagerId.processId'
        }, {
            $project: {
                _id: '$processManagerId._id',
                date: '$date',
                toStatus: '$toStatus',
                cheques: '$processManagerId.processId.cheques',
                courId: '$processManagerId.processId.courierId'
            }
        }, {
            $unwind: '$cheques'
        }, {
            $lookup: {
                from: 'cheques',
                localField: 'cheques',
                foreignField: '_id',
                as: 'cheques'
            }
        }, {
            $unwind: '$cheques'
        }, {
            $group: {
                _id: '$_id',
                cash: {
                    $sum: '$cheques.cash'
                },
                count: {
                    $sum: 1
                },
                status: {
                    $addToSet: '$toStatus'
                },
                dates: {
                    $addToSet: '$date'
                },
                courId: {
                    $addToSet: '$courId'
                }
            }
        }, {
            $match: {
                status: {
                    $elemMatch: {
                        $in: [
                            'admin'
                        ]
                    }
                }
            }
        }, {
            $project: {
                courId: {
                    $size: '$courId'
                },
                cash: {
                    $divide: [
                        '$cash',
                        2
                    ]
                },
                count: {
                    $divide: [
                        '$count',
                        2
                    ]
                },
                dates: '$dates'
            }
        }]
    )

    res.status(200).json({ eachAdmin })
})

// adminda red etish va tasdiqlash

router.get('/adminConfirm', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AA'), async (req, res) => {

    const adminCash = await ProcessDate.aggregate(
        [{
            $match: {
                isRefusal: false,
                toStatus: 'processAdmin'
            }
        }, {
            $lookup: {
                from: 'processmanagers',
                localField: 'processManagerId',
                foreignField: '_id',
                as: 'processManagerId'
            }
        }, {
            $unwind: '$processManagerId'
        }, {
            $match: {
                'processManagerId.status': 'inManager'
            }
        }, {
            $unwind: '$processManagerId.processId'
        }, {
            $lookup: {
                from: 'processes',
                localField: 'processManagerId.processId',
                foreignField: '_id',
                as: 'processManagerId.processId'
            }
        }, {
            $unwind: '$processManagerId.processId'
        }, {
            $unwind: '$processManagerId.processId.cheques'
        }, {
            $lookup: {
                from: 'cheques',
                localField: 'processManagerId.processId.cheques',
                foreignField: '_id',
                as: 'cheques'
            }
        }, {
            $unwind: '$cheques'
        }, {
            $lookup: {
                from: 'users',
                localField: 'processManagerId.managerId',
                foreignField: '_id',
                as: 'processManagerId.managerId'
            }
        }, {
            $unwind: '$processManagerId.managerId'
        }, {
            $group: {
                _id: '$processManagerId._id',
                count: {
                    $addToSet: '$cheques._id'
                },
                cash: {
                    $sum: '$cheques.cash'
                },
                date: {
                    $addToSet: '$date'
                },
                fullname: {
                    $addToSet: '$processManagerId.managerId.fullname'
                },
                processDates: {
                    $addToSet: '$_id'
                }
            }
        }, {
            $unwind: '$processDates'
        }, {
            $project: {
                count: {
                    $size: '$count'
                },
                fullname: '$fullname',
                date: '$date',
                cash: '$cash',
                processDates: '$processDates'
            }
        }]
    )

    res.status(200).json({ adminCash })
})

// admindagi summa

router.get('/adminSumm', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AA'), async (req, res) => {

    const adminSumm = await ProcessDate.aggregate(
        [{
            $match: {
                isRefusal: false,
                toStatus: 'processAdmin'
            }
        }, {
            $lookup: {
                from: 'processmanagers',
                localField: 'processManagerId',
                foreignField: '_id',
                as: 'processManagerId'
            }
        }, {
            $unwind: '$processManagerId'
        }, {
            $match: {
                'processManagerId.status': 'inManager'
            }
        }, {
            $unwind: '$processManagerId.processId'
        }, {
            $lookup: {
                from: 'processes',
                localField: 'processManagerId.processId',
                foreignField: '_id',
                as: 'processManagerId.processId'
            }
        }, {
            $unwind: '$processManagerId.processId'
        }, {
            $unwind: '$processManagerId.processId.cheques'
        }, {
            $lookup: {
                from: 'cheques',
                localField: 'processManagerId.processId.cheques',
                foreignField: '_id',
                as: 'cheques'
            }
        }, {
            $unwind: '$cheques'
        }, {
            $group: {
                _id: '$_id',
                cash: {
                    $sum: '$cheques.cash'
                }
            }
        }]
    )
    res.status(200).json({ adminSumm })
})

module.exports = router