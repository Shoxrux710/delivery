const { Router } = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const ProcessDate = require('../models/ProcessDate')
const mongoose = require('mongoose');
const { managerAsset } = require('../utils/function')
const router = Router()


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
                from: 'processes',
                localField: 'processId',
                foreignField: '_id',
                as: 'processId'
            }
        }, {
            $unwind: '$processId'
        }, {
            $unwind: '$processId.processId'
        }, {
            $lookup: {
                from: 'processes',
                localField: 'processId.processId',
                foreignField: '_id',
                as: 'processId.processId'
            }
        }, {
            $unwind: '$processId.processId'
        }, {
            $unwind: '$processId.processId.cheques'
        }, {
            $lookup: {
                from: 'cheques',
                localField: 'processId.processId.cheques',
                foreignField: '_id',
                as: 'cheques'
            }
        }, {
            $unwind: '$cheques'
        }, {
            $lookup: {
                from: 'users',
                localField: 'processId.courierId',
                foreignField: '_id',
                as: 'processId.courierId'
            }
        }, {
            $unwind: '$processId.courierId'
        }, {
            $group: {
                _id: '$_id',
                count: {
                    $addToSet: '$_id'
                },
                cash: {
                    $sum: '$cheques.cash'
                },
                date: {
                    $addToSet: '$date'
                },
                fullname: {
                    $addToSet: '$processId.courierId.fullname'
                }
            }
        }, {
            $unwind: '$fullname'
        }, {
            $unwind: '$date'
        }, {
            $project: {
                count: {
                    $size: '$count'
                },
                fullname: '$fullname',
                date: '$date',
                cash: '$cash'
            }
        }]
    )

    res.status(200).json({ adminCash })
})

router.get('/adminSumm', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AA'), async (req, res) => {

    const adminSumm = await ProcessDate.aggregate(
        [{
            $match: {
                isRefusal: false,
                toStatus: 'processAdmin'
            }
        }, {
            $lookup: {
                from: 'processes',
                localField: 'processId',
                foreignField: '_id',
                as: 'processId'
            }
        }, {
            $unwind: '$processId'
        }, {
            $unwind: '$processId.processId'
        }, {
            $lookup: {
                from: 'processes',
                localField: 'processId.processId',
                foreignField: '_id',
                as: 'processId.processId'
            }
        }, {
            $unwind: '$processId.processId'
        }, {
            $unwind: '$processId.processId.cheques'
        }, {
            $lookup: {
                from: 'cheques',
                localField: 'processId.processId.cheques',
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

    res.status(200).json({adminSumm})

})


// boshqaruvchida rad etish va tasdiqlash

router.get('/confirm', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('BB'), async (req, res) => {

    const { id } = req.user

    const managerCash = await ProcessDate.aggregate(managerAsset(id, true))

    res.status(200).json({ managerCash })

})


// bashqaruvchida cardlarni chiqarib berish

router.get('/asset', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('BB'), async (req, res) => {

    const { id } = req.user

    const managerCashAsset = await ProcessDate.aggregate(managerAsset(id))

    res.status(200).json({ managerCashAsset })
})

// boshqaruvchidagi umumiy summani chiqarib beradi

router.get('/courSumm', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('BB'), async (req, res) => {

    const { id } = req.user

    const processSumm = await ProcessDate.aggregate(
        [{
            $match: {
                isRefusal: false,
                toStatus: 'process-Cour'
            }
        }, {
            $lookup: {
                from: 'processes',
                localField: 'processId',
                foreignField: '_id',
                as: 'processId'
            }
        }, {
            $unwind: '$processId'
        }, {
            $unwind: '$processId.cheques'
        }, {
            $lookup: {
                from: 'users',
                localField: 'processId.courierId',
                foreignField: '_id',
                as: 'courierId'
            }
        }, {
            $unwind: '$courierId'
        }, {
            $lookup: {
                from: 'cheques',
                localField: 'processId.cheques',
                foreignField: '_id',
                as: 'processId.cheques'
            }
        }, {
            $unwind: '$processId.cheques'
        }, {
            $match: {
                'courierId.managerId': mongoose.Types.ObjectId(id)
            }
        }, {
            $group: {
                _id: 'static',
                count: {
                    $sum: '$processId.cheques.cash'
                }
            }
        }]
    )

    res.status(200).json({ processSumm })
})


// admin rad etish

router.put('/rejectionAdmin', (req,res) => {

    const {id} = req.query

    ProcessDate.findById(id, async (err, processDateOne) => {
        if (err) return res.status(400).json({errorMessage: 'error server'})
        processDateOne.isRefusal = true
        await processDateOne.save()
        res.status(200).json({successMessage: 'admin rad etish'})
    })
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

// kuryerdagi arxivlarni chiqarib beradi

router.get('/lastCour', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('COUR'), async (req, res) => {

    const { id } = req.user

    const lastProcess = await ProcessDate.aggregate(
        [{
            $lookup: {
                from: 'processes',
                localField: 'processId',
                foreignField: '_id',
                as: 'process'
            }
        }, {
            $unwind: '$process'
        }, {
            $unwind: '$process.cheques'
        }, {
            $match: {
                'process.courierId': mongoose.Types.ObjectId(id),
                'process.status': 'inManager'
            }
        }, {
            $lookup: {
                from: 'cheques',
                localField: 'process.cheques',
                foreignField: '_id',
                as: 'process.cheques'
            }
        }, {
            $unwind: '$process.cheques'
        }, {
            $group: {
                _id: '$processId',
                cash: {
                    $sum: '$process.cheques.cash'
                },
                count: {
                    $sum: 1
                },
                dates: {
                    $addToSet: '$date'
                }
            }
        }, {
            $project: {
                dates: '$dates',
                count: {
                    $divide: [
                        '$count',
                        2
                    ]
                },
                cash: {
                    $divide: [
                        '$cash',
                        2
                    ]
                }
            }
        }]
    )

    res.status(200).json({ lastProcess })
})

// kuryer arxivdagi har bir cardni chiqarib beradi

router.get('/eachCour', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('COUR'), async (req, res) => {

    const { id } = req.query

    const eachProcess = await ProcessDate.aggregate(
        [{
            $lookup: {
                from: 'processes',
                localField: 'processId',
                foreignField: '_id',
                as: 'processId'
            }
        }, {
            $unwind: '$processId'
        }, {
            $match: {
                'processId._id': mongoose.Types.ObjectId(id),
                toStatus: 'inManager'
            }
        }, {
            $unwind: '$processId.cheques'
        }, {
            $lookup: {
                from: 'cheques',
                localField: 'processId.cheques',
                foreignField: '_id',
                as: 'cheques'
            }
        }, {
            $unwind: '$cheques'
        }, {
            $lookup: {
                from: 'deliveries',
                localField: 'cheques.deliveryId',
                foreignField: '_id',
                as: 'deliveryId'
            }
        }, {
            $unwind: '$deliveryId'
        }, {
            $lookup: {
                from: 'orders',
                localField: 'deliveryId.orderId',
                foreignField: '_id',
                as: 'deliveryId.orderId'
            }
        }, {
            $unwind: '$deliveryId.orderId'
        }, {
            $lookup: {
                from: 'customers',
                localField: 'deliveryId.orderId.customerId',
                foreignField: '_id',
                as: 'customerId'
            }
        }, {
            $unwind: '$customerId'
        }, {
            $project: {
                code: '$deliveryId.orderId.code',
                date: '$cheques.date',
                cash: '$cheques.cash',
                fullname: '$customerId.fullname',
                phone: '$customerId.phone'
            }
        }]
    )

    res.status(200).json({ eachProcess })

})

// kuryer arxivdagi har bir cardni umumiy summasini chiqarib beradi

router.get('/eachCourPrice', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('COUR'), async (req, res) => {

    const { id } = req.query

    const eachPrice = await ProcessDate.aggregate(
        [{
            $lookup: {
                from: 'processes',
                localField: 'processId',
                foreignField: '_id',
                as: 'processId'
            }
        }, {
            $unwind: '$processId'
        }, {
            $match: {
                'processId._id': mongoose.Types.ObjectId(id),
                toStatus: 'inManager'
            }
        }, {
            $unwind: '$processId.cheques'
        }, {
            $lookup: {
                from: 'cheques',
                localField: 'processId.cheques',
                foreignField: '_id',
                as: 'cheques'
            }
        }, {
            $unwind: '$cheques'
        }, {
            $group: {
                _id: 'static',
                count: {
                    $sum: '$cheques.cash'
                }
            }
        }]
    )

    res.status(200).json({ eachPrice })
})

module.exports = router