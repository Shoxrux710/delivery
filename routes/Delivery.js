const {Router} = require('express')
const Delivery = require('../models/Delivery')
const nowDate = require('../utils/nowDate')
const router = Router()


router.post('/all', async (req, res) => {

    const {orderId, courierId} = req.body
    const {date} = nowDate()

    const deliver = Delivery({
        orderId,
        courierId,
        date
    })

})



module.exports = router