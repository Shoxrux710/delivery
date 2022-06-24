const { Router } = require('express')
const Cheque = require('../models/Cheque')
const Order = require('../models/Order')
const Delivery = require('../models/Delivery')
const mongoose = require('mongoose')
const nowDate = require('../utils/nowDate')
const router = Router()


router.post('/all', async (req, res) => {

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

        const deliverId = await Delivery.findOne({_id: deliveryId})
        deliverId.status = 'delivered'
        const orderStatus = deliverId.orderId

        const orderCompleted = Order.findOne({_id: orderStatus})
        orderCompleted.status = 'completed'

        await orderCompleted.save({session})

        await deliverId.save({session})

        await cheque.save({session})
        await session.commitTransaction()

    } catch (err) {
        await session.abortTransaction()
        res.status(500).json({errorMessage: 'server error'})
    }

    session.endSession()

})

module.exports = router