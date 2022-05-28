const {Router} = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const {productValidator} = require('../utils/validator')
const {validationResult} = require('express-validator')
const Product = require('../models/Product')
const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       price: 
 *         type: number
 *     responses:
 *        200:
 *          description: response 200
 *        500:
 *          description: response 500
 *        400:
 *          description: response 400
 */

/**
 * @swagger
 * /api/product/all:
 *  post:
 *   summary: mahsulot kiritish
 *   tags: [Product]
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             $ref: "#/components/schemas/Product"
 *   security:
 *     - bearerAuth: [] 
 *   responses:
 *      200:
 *         description: response 200
 *      400: 
 *         description: response 400
 *      500:
 *         description: response 500 
 */
router.post('/all', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AA'), productValidator, (req,res) => {

    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), errorMessage: `Please fill in` })

    const {name, price} = req.body
    const product = new Product({name, price})
    product.save(err => {
        if (err) return res.status(400).json({errorMessage: 'Xato'})
        res.status(200).json({successMessage: 'Mahsulot kiritildi'})
    })
})

/**
 * @swagger
 * /api/product:
 *  get:
 *   summary: mahsulotlarni hammasini chiqarib beradi
 *   tags: [Product]
 *   responses:
 *      200:
 *         description: response 200
 *      400: 
 *         description: response 400
 *      500:
 *         description: response 500 
 * 
 */

router.get('/', async (req,res) => {

    const product = await Product.find()
    res.status(200).json({product})
})

/**
 * @swagger
 * /api/product/delete/{id}:
 *  delete:
 *   summary: mahsulotni id bo'yicha o'chirish
 *   tags: [Product]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema: 
 *         type: string
 *       required: true
 *   security:
 *     - bearerAuth: []
 *   responses:
 *      200:
 *         description: response 200
 *      400: 
 *         description: response 400
 *      500:
 *         description: response 500 
 */

router.delete('/delete/:id', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AA'), (req,res) => {
    const {id} = req.params

    Product.deleteOne({_id: id}, err => {
        if (err) return res.status(400).json({errorMessage: 'Xato'})
        res.status(200).json({successMessage: 'Delete'})
    })

})

module.exports = router