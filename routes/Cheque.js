const { Router } = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const Cheque = require('../models/Cheque')
const Order = require('../models/Order')
const Delivery = require('../models/Delivery')
const mongoose = require('mongoose')
const nowDate = require('../utils/nowDate');
const { func, funcDebt } = require('../utils/function');
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


router.get('/debt', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('ALL'), async (req, res) => {
    const { position, id } = req.user
    const chequeDebt = await Cheque.aggregate(func(position, id));
    res.status(200).json({ chequeDebt })
})

router.get('/debtCard', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('ALL'), async (req, res) => {
    const { position, id } = req.user
    const chequeAll = await Cheque.aggregate(func(position, id, true));
    res.status(200).json({ chequeAll })
})

router.get('/cash', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('COUR'), async (req, res) => {

    const { position, id } = req.user
    const chequeCash = await Cheque.aggregate(func(position, id, false, true))

    res.status(200).json({ chequeCash })

})

router.get('/cashCard', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('COUR'), async (req, res) => {

    const { id } = req.user

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
            $project: {
                cash: '$cash',
                courierId: '$deliveryId.courierId._id',
                fullname: '$deliveryId.courierId.fullname',
                phone: '$deliveryId.courierId.phone',
                date: '$date',
                code: '$deliveryId.orderId.code'
            }
        }, {
            $match: {
                courierId: mongoose.Types.ObjectId(id)
            }
        }]
    )

    res.status(200).json({ chequeCard })
})


/**
 * @swagger
 * /api/cheque/userPrice:
 *  get:
 *   summary: xaridorni qarzlar tarixi
 *   tags: [Cheque]
 *   parameters:
 *     - in: query
 *       name: userId
 *       schema:
 *          type: string
 *       required: true
 *   security: 
 *    - bearerAuth: []
 *   responses:
 *        200:
 *          description: response 200   
 *        500:
 *          description: response 500  
 */

router.get('/userPrice', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('ALL'), async (req, res) => {

    const { position, id } = req.user
    const { userId } = req.query

    const userPrice = await Cheque.aggregate(funcDebt(position, id, userId, true))

    res.status(200).json({ userPrice })
})

/**
 * @swagger
 * /api/cheque/cardPrice:
 *  get:
 *   summary: xaridorni qarzlar tarixi
 *   tags: [Cheque]
 *   parameters:
 *     - in: query
 *       name: userId
 *       schema:
 *          type: string
 *       required: true
 *   security: 
 *    - bearerAuth: []
 *   responses:
 *        200:
 *          description: response 200   
 *        500:
 *          description: response 500  
 */

router.get('/cardPrice', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('ALL'), async (req, res) => {

    const { position, id } = req.user
    const { userId } = req.query

    // const filter = position === 'manager' ? 'managerId' : (position === 'agent' ? 'agentId' : 'courierId')

    // const filterCash = (position === 'super-admin' || position === 'admin') ? [] : ([{
    //     '$match': {
    //         'customerId': mongoose.Types.ObjectId(userId),
    //         [filter]: mongoose.Types.ObjectId(id)
    //     }
    // }]);

    const cardPrice = await Cheque.aggregate(funcDebt(position, id, userId))

    console.log(cardPrice)

    res.status(200).json({ cardPrice })

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