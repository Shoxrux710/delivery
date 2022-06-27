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


router.get('/cash', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('ALL'), async (req, res) => {

    const { position, id, worker } = req.user

    const objectIdWorker = worker.map((w) => mongoose.Types.ObjectId(w))
    const objectStatus = { agentId: { $in: objectIdWorker } }

    const filterAgent = (position === 'admin' || position === 'super-admin') ? {} :
        (position === 'manager' ? { ...objectStatus } : { agentId: mongoose.Types.ObjectId(id) })

    const chequeDebt = await Cheque.find({ debt: { $gt: 0 } })
          .populate({path: 'deliveryId', select: '', 
          populate: [{path: 'courierId', select: 'fullname'}, 
          {path: 'orderId', select: 'code date products', populate: [{path: 'agentId', select: 'fullname'}]}]}) 
    const chequeCash = await Cheque.find({ cash: { $gt: 0 } })

    // const groupCash = await Cheque.aggregate(
    //     [{
    //         $lookup: {
    //             from: 'deliveries',
    //             localField: 'deliveryId',
    //             foreignField: '_id',
    //             as: 'deliveryId'
    //         }
    //     }, {
    //         $unwind: {
    //             path: '$deliveryId'
    //         }
    //     }, {
    //         $lookup: {
    //             from: 'orders',
    //             localField: 'deliveryId.orderId',
    //             foreignField: '_id',
    //             as: 'deliveryId.orderId'
    //         }
    //     }, {
    //         $unwind: {
    //             path: '$deliveryId.orderId'
    //         }
    //     }]
    // )

    res.status(200).json({
        chequeCash,
        chequeDebt
    })

})

module.exports = router