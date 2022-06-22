const { Router } = require('express')
const Delivery = require('../models/Delivery')
const Order = require('../models/Order')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const mongoose = require('mongoose')
const nowDate = require('../utils/nowDate')
const router = Router()


/**
 * @swagger
 * components:
 *  schemas:
 *    Delivery:
 *      type: object
 *      properties:
 *          orderId:
 *             type: string
 *          courierId:
 *             type: string
 *      required:
 *          - orderId
 *          - courierId
 */

/**
 * @swagger
 * /api/deliver/all:
 *  post:
 *   summary: buyurtmani kuryerga berish
 *   tags: [Delivery]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *          schema:
 *              type: object
 *              $ref: "#/components/schemas/Delivery"
 *   responses:
 *       200:
 *         description: response 200   
 *       400:
 *         description: response 400
 *       500:
 *         description: response 500 
 *   
 */

router.post('/all', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('BB'),  async (req, res) => {

    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const { orderId, courierId } = req.body
        const { date } = nowDate()

        const deliver = new Delivery({
            orderId,
            courierId,
            date
        })

        const order = await Order.findOne({ _id: orderId })
        order.status = 'courier'

        await order.save({ session })
        await deliver.save({ session })
        await session.commitTransaction()

        res.status(200).json({ successMessage: 'Kuryer kiritildi' })
    } catch (e) {
        session.abortTransaction()
        res.status(500).json({ errorMessage: 'server error' })
    }

    session.endSession()

})


router.get('/each', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('COUR'), async (req, res) => {

    const {id} = req.user

    const deliver = await Delivery.aggregate(
        [
            {
                $match: {
                    courierId: mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'orders',
                    localField: 'orderId',
                    foreignField: '_id',
                    as: 'orderId'
                }
            },
            {
                $unwind: {
                    path: '$orderId'
                }
            }, {
                $unwind: {
                    path: '$orderId.products'
                }
            }, {
                $lookup: {
                    from: 'products',
                    localField: 'orderId.products.productId',
                    foreignField: '_id',
                    as: 'orderId.products.productId'
                }
            }, {
                $unwind: {
                    path: '$orderId.products.productId'
                }
            }, {
                $group: {
                    _id: 'static',
                    totalPrice: {
                        $sum: {
                            $multiply: [
                                '$orderId.products.productId.price',
                                '$orderId.products.count'
                            ]
                        }
                    },
                    count: {
                        $sum: '$orderId.products.count'
                    }
                }
            }]
    )

    delete deliver[0]._id

    res.status(200).json({deliver: deliver[0]})
})

router.get('/:id', async (req,res) => {
    const {id} = req.params

    const deliverId = await Delivery.findOne({_id: id})
    .populate({path: 'orderId', select: 'code', populate: [{path: 'customerId', select: 'address'}, {path: 'agentId', select: 'fullname'}] })
    .populate('courierId', 'fullname')

    res.status(200).json({deliverId})

})




module.exports = router