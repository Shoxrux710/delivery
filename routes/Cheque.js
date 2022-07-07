const { Router } = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const Cheque = require('../models/Cheque')
const Order = require('../models/Order')
const Delivery = require('../models/Delivery')
const mongoose = require('mongoose')
const nowDate = require('../utils/nowDate')
const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Cheque:
 *       type: object
 *       properties: 
 *           comment:
 *             type: string
 *           cash:
 *             type: number
 *           debt:
 *             type: number
 *           card:
 *             type: number
 *           deliveryId:
 *             type: string 
 *       required:
 *          - comment
 *          - cash
 *          - debt
 *          - card
 *          - deliveryId 
 */

/**
 * @swagger
 * /api/cheque/all:
 *  post:
 *   summary: kuryer buyurtmani tugatishi
 *   tags: [Cheque]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *          schema:
 *            type: object 
 *            $ref: "#/components/schemas/Cheque"
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

router.post('/all', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('COUR'), async (req, res) => {

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { comment, cash, debt, card, deliveryId } = req.body
        const { date } = nowDate()

        const cheque = new Cheque({
            comment,
            cash,
            debt,
            card,
            deliveryId,
            date
        })

        const deliverId = await Delivery.findOne({ _id: deliveryId })
        deliverId.status = 'delivered'
        const orderStatus = deliverId.orderId
        console.log(orderStatus)
        const orderCompleted = await Order.findOne({ _id: orderStatus })
        console.log(orderCompleted)

        orderCompleted.status = 'completed'

        await orderCompleted.save({ session })

        await deliverId.save({ session })

        await cheque.save({ session })
        await session.commitTransaction()

        res.status(200).json({ successMessage: `tugatilgan buyurtmani o'tdi` })
    } catch (err) {
        await session.abortTransaction()
        res.status(500).json({ errorMessage: 'server error' })
    }

    session.endSession()

})


router.get('/cash', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('COUR'), async (req, res) => {

    const { position, id } = req.user

    const filter = position === 'manager' ? 'agent.manager' : (position === 'agent' ? 'order.agentId' : 'deliveryId.courierId')

    const filterCash = (position === 'super-admin' || position === 'admin') ? [] : ([{
        '$match': {
            [filter]: mongoose.Types.ObjectId(id)
        }
    }])

    const chequeCash = await Cheque.aggregate(
        [{
            $match: {
                cash: {
                    $gt: 0
                }
            }
        }, {
            $lookup: {
                from: 'deliveries',
                localField: 'deliveryId',
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
                as: 'order'
            }
        }, {
            $unwind: '$order'
        }, {
            $lookup: {
                from: 'users',
                localField: 'order.agentId',
                foreignField: '_id',
                as: 'agent'
            }
        }, {
            $unwind: '$agent'
        },
        ...filterCash
            , {
            $group: {
                _id: 'static',
                count: {
                    $sum: '$cash'
                }
            }
        }]
    )

    const chequeCard = await Cheque.aggregate(
        [{
            $match: {
                cash: {
                    $gt: 0
                }
            }
        }, {
            $lookup: {
                from: 'deliveries',
                localField: 'deliveryId',
                foreignField: '_id',
                as: 'deliveryId'
            }
        }, {
            $unwind: '$deliveryId'
        }, {
            $lookup: {
                from: 'users',
                localField: 'deliveryId.courierId',
                foreignField: '_id',
                as: 'deliveryId.courierId'
            }
        }, {
            $unwind: '$deliveryId.courierId'
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
                as: 'deliveryId.orderId.customerId'
            }
        }, {
            $unwind: '$deliveryId.orderId.customerId'
        }]
    )

    res.status(200).json({
        chequeCard,
        chequeCash
    })

})


router.get('/:id', async (req, res) => {

    const { id } = req.params

    const chequeId = await Cheque.findOne({ _id: id }).populate({
        path: 'deliveryId', select: 'date',
        populate: [{ path: 'courierId', select: 'fullname address phone' }, {
            path: 'orderId', select: 'code date products',
            populate: [{ path: 'customerId', select: 'fullname phone' }, { path: 'products.productId', select: 'name price' }]
        }]
    })


    res.status(200).json({ chequeId })

})

module.exports = router