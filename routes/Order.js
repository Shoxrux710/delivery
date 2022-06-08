const { Router } = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const { orderValidator } = require('../utils/validator')
const { validationResult } = require('express-validator')
const nowDate = require('../utils/nowDate')
const mongoose = require('mongoose')
const Order = require('../models/Order')
const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties: 
 *           customer:
 *             type: string
 *           region:
 *             type: string
 *           fog:
 *             type: string
 *           address:
 *             type: string
 *           phone: 
 *             type: string
 *           twoPhone:
 *             type: string
 *           status:
 *             type: string
 *           productArray:
 *             type: array
 *             items: 
 *               type: object
 *               properties: 
 *                 productId:
 *                    type: string
 *                 number:
 *                    type: number
 *       required:
 *          - customer
 *          - region
 *          - fog
 *          - address
 *          - phone
 *          - agentId
 *          - productArray
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
    const order = await Order.findOne({ randomId: random });
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
        customer,
        region,
        fog,
        address,
        phone,
        twoPhone,
        status,
        productArray,
    } = req.body

    const order = new Order({
        customer,
        region,
        fog,
        address,
        phone,
        twoPhone,
        status,
        date,
        productArray,
        agentId: id,
        randomId: random
    })

    order.save()
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
 *       name: pagination
 *       schema:   
 *          type: object
 *       required: 
 *          - status
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
router.get('/each', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('ALL'),  async (req, res) => {

    const {position, worker, id} = req.user
    console.log(position)
    const { status } = req.query
    const statusActive = 'active'
    const objectIdWorker = worker.map((w) => mongoose.Types.ObjectId(w))
    const objectCour = worker.map((c) => mongoose.Types.ObjectId(c))
    const objectStatus = statusActive === 'active' ? {agentId: {$in: objectIdWorker}} : {courId: {$in: objectCour}}

    const filterAgent = (position === 'admin' || position === 'super-admin') ? {} : 
    (position === 'manager' ? {...objectStatus} : (position === 'courier' ? {courId: mongoose.Types.ObjectId(id)} : {agentId: mongoose.Types.ObjectId(id)}))


    const orderStatus = await Order.find({ status: status, ...filterAgent })
        .populate({ path: 'productArray', select: 'number', populate: [{ path: 'productId', select: 'name price' }] })
        .populate({ path: 'agentId', select: 'fullname', populate: [{ path: 'regionId', select: 'name' }] })

    const orderCount = await Order.aggregate(
        [{
            $match: {
                status: status,
                ...filterAgent 
            }
        }, {
            $unwind: {
                path: '$productArray'
            }
        }, {
            $lookup: {
                from: 'products',
                localField: 'productArray.productId',
                foreignField: '_id',
                as: 'productArray.productId'
            }
        }, {
            $unwind: {
                path: '$productArray.productId'
            }
        }, {
            $group: {
                _id: 'static',
                totalPrice: {
                    $sum: {
                        $multiply: [
                            '$productArray.number',
                            '$productArray.productId.price'
                        ]
                    }
                },
                count: {
                    $sum: '$productArray.number'
                }
            }
        }]
    )

    delete orderCount[0]._id

    res.status(200).json({
        orderStatus,
        orderCount: orderCount[0]
    })

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

    const orderId = await Order.findOne({ _id: id }).populate({ path: 'productArray', select: 'number', populate: [{ path: 'productId', select: 'name price' }] })
        .populate({ path: 'agentId', select: 'fullname', populate: [{ path: 'regionId', select: 'name' }] })
    res.status(200).json({ orderId })

})

/**
 * @swagger
 * /api/order/courier:
 *  put:
 *   summary: kuryer buyurtmaga o'tkazish
 *   tags: [Order]
 *   parameters:
 *     - in: query
 *       name: pagination
 *       schema:
 *          type: object
 *       required:
 *          - courierId
 *          - id 
 *   responses:
 *       200:
 *         description: response 200   
 *       400:
 *         description: response 400
 *       500:
 *         description: response 500 
 */

router.put('/courier', (req, res) => {      
    const { courierId, id } = req.query

    Order.findById(id, (err, orderOne) => {
        if (err) return res.status(400).json({ errorMessage: 'Xato' })
        orderOne.courId = courierId
        orderOne.status = 'courier'

        orderOne.save(err => {
            if (err) return res.status(400).json({ errorMessage: 'Xato' })
            res.status(200).json({ successMessage: `kuryerga o'tkazildi` })
        })
    })
})

module.exports = router