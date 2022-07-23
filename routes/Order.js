const { Router } = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const { orderValidator } = require('../utils/validator')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const nowDate = require('../utils/nowDate')
const Order = require('../models/Order')
const User = require('../models/User')
const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties: 
 *           customerId:
 *             type: string
 *           products:
 *             type: array
 *             items: 
 *               type: object
 *               properties: 
 *                 productId:
 *                    type: string
 *                 count:
 *                    type: number
 *       required:
 *          - customerId
 *          - products
 */

/**
 * @swagger
 * /api/order/add:
 *  post:
 *   summary: buyurtmalarni kiritish
 *   tags: [Order]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *           schema:
 *              type: object
 *              $ref: "#/components/schemas/Order"
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

const randomNumber = async () => {
    const random = Math.floor(Math.random() * 999999);
    console.log(random);
    const order = await Order.findOne({ code: random });
    if (order)
        return randomNumber();

    return Promise.resolve(random);
}


router.post('/add', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AGENT'), orderValidator, async (req, res) => {

    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), errorMessage: `Please fill in` })

    const { id } = req.user
    const random = await randomNumber();
    const { date } = nowDate()

    const {
        customerId,
        products,
    } = req.body

    const order = new Order({
        customerId,
        date,
        products,
        agentId: id,
        code: random
    })

    await order.save()
    res.status(200).json({ successMessage: 'Buyurtma kiritildi' })
})


/**
 * @swagger
 * /api/order/each:
 *  get:
 *   summary: buyurtmalarni status bo'yicha chiqarib beradi
 *   tags: [Order]
 *   parameters:
 *     - in: query
 *       name: status
 *       schema:   
 *          type: string
 *       required: true
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
router.get('/each', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('ALL'), async (req, res) => {

    const { position, id } = req.user
    const { status } = req.query
    console.log(position)

    const filter = position === 'manager' ? 'agentId.managerId' : 'agentId._id'

    const filterAgent = (position === 'admin' || position === 'super-admin') ? [] : ([{
        '$match': {
            [filter]: mongoose.Types.ObjectId(id)
        }
    }])



    if (position === 'admin' || position === 'super-admin') {
        const orderAdmin = await Order.aggregate(
            [{
                $match: {
                    status: status
                }
            }, {
                $lookup: {
                    from: 'customers',
                    localField: 'customerId',
                    foreignField: '_id',
                    as: 'customerId'
                }
            }, {
                $unwind: '$customerId'
            }, {
                $unwind: {
                    path: '$products'
                }
            }, {
                $lookup: {
                    from: 'products',
                    localField: 'products.productId',
                    foreignField: '_id',
                    as: 'products.productId'
                }
            }, {
                $unwind: {
                    path: '$products.productId'
                }
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'agentId',
                    foreignField: '_id',
                    as: 'agentId'
                }
            }, {
                $unwind: '$agentId'
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'agentId.managerId',
                    foreignField: '_id',
                    as: 'agent'
                }
            }, {
                $unwind: '$agent'
            }, {
                $lookup: {
                    from: 'regions',
                    localField: 'agentId.regionId',
                    foreignField: '_id',
                    as: 'regionId'
                }
            }, {
                $unwind: '$regionId'
            }, {
                $group: {
                    _id: '$agent._id',
                    orderPrice: {
                        $sum: {
                            $multiply: [
                                '$products.count',
                                '$products.productId.price'
                            ]
                        }
                    },
                    count: {
                        $sum: 1
                    },
                    fullname: {
                        $push: '$agent.fullname'
                    },
                    region: {
                        $push: '$regionId.name'
                    },
                    phone: {
                        $push: '$customerId.phone'
                    },
                    products: {
                        $push: '$products'
                    },
                    date: {
                        $push: '$date'
                    }
                }
            }, {
                $project: {
                    count: '$count',
                    orderPrice: '$orderPrice',
                    fullname: {
                        $arrayElemAt: [
                            '$fullname',
                            0
                        ]
                    },
                    region: {
                        $arrayElemAt: [
                            '$region',
                            0
                        ]
                    },
                    phone: {
                        $arrayElemAt: [
                            '$phone',
                            0
                        ]
                    },
                    date: {
                        $arrayElemAt: [
                            '$date',
                            0
                        ]
                    },
                    products: '$products'
                }
            }, {
                $sort: {
                    date: -1
                }
            }]
        )

        return res.status(200).json({ orderAdmin })
    } else {
        orderManger = await Order.aggregate(
            [{
                $match: {
                    status: 'active'
                }
            }, {
                $unwind: '$products'
            }, {
                $lookup: {
                    from: 'products',
                    localField: 'products.productId',
                    foreignField: '_id',
                    as: 'products.productId'
                }
            }, {
                $unwind: '$products.productId'
            }, {
                $lookup: {
                    from: 'customers',
                    localField: 'customerId',
                    foreignField: '_id',
                    as: 'customerId'
                }
            }, {
                $unwind: '$customerId'
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'agentId',
                    foreignField: '_id',
                    as: 'agentId'
                }
            }, {
                $unwind: '$agentId'
            },
            ...filterAgent
                , {
                $group: {
                    _id: '$_id',
                    orderPrice: {
                        $sum: {
                            $multiply: [
                                '$products.count',
                                '$products.productId.price'
                            ]
                        }
                    },
                    date: {
                        $push: '$date'
                    },
                    fullname: {
                        $push: '$customerId.fullname'
                    },
                    phone: {
                        $push: '$customerId.phone'
                    },
                    address: {
                        $push: '$customerId.address'
                    },
                    code: {
                        $push: '$code'
                    },
                    name: {
                        $push: '$products.productId.name'
                    },
                    status: {
                        $push: '$status'
                    },
                    products: {
                        $push: '$products'
                    },
                    regionId: {
                        $push: '$agentId.regionId'
                    }
                }
            }, {
                $project: {
                    date: {
                        $arrayElemAt: [
                            '$date',
                            0
                        ]
                    },
                    fullname: {
                        $arrayElemAt: [
                            '$fullname',
                            0
                        ]
                    },
                    phone: {
                        $arrayElemAt: [
                            '$phone',
                            0
                        ]
                    },
                    address: {
                        $arrayElemAt: [
                            '$address',
                            0
                        ]
                    },
                    code: {
                        $arrayElemAt: [
                            '$code',
                            0
                        ]
                    },
                    name: {
                        $arrayElemAt: [
                            '$name',
                            0
                        ]
                    },
                    status: {
                        $arrayElemAt: [
                            '$status',
                            0
                        ]
                    },
                    regionId: {
                        $arrayElemAt: [
                            '$regionId',
                            0
                        ]
                    },
                    products: '$products',
                    orderPrice: '$orderPrice'
                }
            }, {
                $sort: {
                    date: -1
                }
            }]
        )

        return res.status(200).json({ orderManger })
    }


})



/**
 * @swagger
 * /api/order/card:
 *  get:
 *   summary: buyurtmalarni status bo'yicha chiqarib beradi
 *   tags: [Order]
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

router.get('/card', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('ALL'), async (req, res) => {

    const { id, position } = req.user

    // const func = () => {
    //     if (position === 'admin' || position === 'super-admin') return null
    //     if (position === 'manager')
    //         return 'agent.managerId'
    //     return '_id.agentId'
    // }

    // const filterAgent = func()
    //     ? {
    //         [func()]: mongoose.Types.ObjectId(id)
    //     } : {}

    const filter = position === 'manager' ? 'agent.managerId' : 'agentId'

    const filterAgent = (position === 'admin' || position === 'super-admin') ? [] : ([{
        '$match': {
            [filter]: mongoose.Types.ObjectId(id)
        }
    }])


    const orderCount = await Order.aggregate(
        [
            {
                '$unwind': '$products'
            }, {
                '$lookup': {
                    'from': 'orders',
                    'localField': '_id',
                    'foreignField': '_id',
                    'as': '_id'
                }
            }, {
                '$unwind': '$_id'
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'products.productId',
                    'foreignField': '_id',
                    'as': 'products.productId'
                }
            }, {
                '$unwind': '$products.productId'
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': '_id.agentId',
                    'foreignField': '_id',
                    'as': 'agent'
                }
            }, {
                '$unwind': {
                    'path': '$agent'
                }
            },
            ...filterAgent,
            {
                '$group': {
                    '_id': '$status',
                    'totalPrice': {
                        '$sum': {
                            '$multiply': [
                                '$products.count', '$products.productId.price'
                            ]
                        }
                    },
                    'count': {
                        '$addToSet': '$_id._id'
                    }
                }
            },
            {
                '$project': {
                    'totalPrice': '$totalPrice',
                    'count': { '$size': '$count' }
                }
            }
        ]
    )

    res.status(200).json({ orderCount })

})


/**
 * @swagger
 * /api/order/{id}:
 *  get:
 *   summary: buyurtmani id bo'yicha chiqarib beradi
 *   tags: [Order]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema: 
 *         type: string
 *       required: true
 *   responses:
 *       200:
 *         description: response 200   
 *       400:
 *         description: response 400
 *       500:
 *         description: response 500 
 */

router.get('/:id', async (req, res) => {
    const { id } = req.params

    const orderId = await Order.findOne({ _id: id })
        .populate('customerId', 'fullname fog address shopNumber phone phoneTwo')
        .populate({ path: 'products', select: 'count', populate: [{ path: 'productId', select: 'name price' }] })
        .populate({ path: 'agentId', select: 'fullname', populate: [{ path: 'regionId', select: 'name' }] })
    res.status(200).json({ orderId })

})

/**
 * @swagger
 * /api/order/{id}:
 *  put:
 *   summary: buyurtmani rad etish
 *   tags: [Order]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
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

router.put('/:id', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('BC'), (req, res) => {

    const { id } = req.params

    Order.findById(id, async (err, oneOrder) => {
        if (err) return res.status(200).json({ errorMessage: 'error' })

        oneOrder.status = 'rejected'
        await oneOrder.save()
        res.status(200).json({ successMessage: 'Buyurtma rad etildi' })

    })

})

module.exports = router