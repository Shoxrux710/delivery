const { Router } = require('express')
const Customer = require('../models/Customer')
const { customerValidator } = require('../utils/validator')
const { validationResult } = require('express-validator')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const config = require('config');
const path = require('path')
const fs = require('fs')
const router = Router()

const deleteOldImage = (fileName) => {
    return new Promise((resolve, rejects) => {
        fs.unlink(path.join(__dirname, `../client/${config.get('imgFolder')}/customer/${fileName}`), err => {
            resolve()
        })
    })
}

/**
 * @swagger
 * components:
 *  schemas:
 *   Customer:
 *    type: object
 *    properties:
 *      fullname:
 *         type: string
 *      region:
 *         type: string
 *      fog:
 *         type: string
 *      address:
 *         type: string
 *      shopNumber:
 *         type: string
 *      phone:
 *         type: string
 *      phoneTwo:
 *         type: string
 *      customerImage:
 *         type: string
 *         format: binary 
 *    required: 
 *      - fullname
 *      - region
 *      - fog
 *      - address
 *      - shopNumber
 *      - phone
 */

/**
 * @swagger
 * /api/customer/all:
 *  post:
 *   summary: Mijozlarni kiritadi
 *   tags: [Customer]
 *   requestBody:
 *     required: true
 *     content:
 *         multipart/form-data:
 *            schema:
 *               type: object
 *               $ref: "#/components/schemas/Customer"
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

router.post('/all', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AGENT'), customerValidator, async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), errorMessage: `Please fill in` })

    const { fullname, region, fog, address, shopNumber, phone, phoneTwo } = req.body
    const { filename } = req.files.customerImage[0]

    const customer = new Customer({
        fullname,
        region,
        fog,
        address,
        shopNumber,
        phone,
        phoneTwo,
        customerImage: {
            fileName: filename
        }
    })

    await customer.save()
    res.status(200).json({ successMessage: 'Mijozlar kiritildi' })
})

/**
 * @swagger
 * /api/customer:
 *  get:
 *   summary: Mijozlarni hammasini chiqarib beradi
 *   tags: [Customer]
 *   responses:
 *    200:
 *     description: response 200
 *    500:
 *     description: response 500 
 */

router.get('/', async (req, res) => {

    const customer = await Customer.find()
    res.status(200).json({ customer })
})

/**
 * @swagger
 * /api/customer/delete/{id}:
 *  delete:
 *   summary: mijozlarni id bo'yicha o'chirish
 *   tags: [Customer]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *   security:
 *     - bearerAuth: [] 
 *   responses:
 *    200:
 *     description: response 200
 *    500:
 *     description: response 500 
 *   
 */

router.delete('/delete/:id', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AGENT'), (req, res) => {

    const { id } = req.params

    Customer.findById(id, (err, customerOne) => {
        if (err) return res.status(400).json({ errorMessage: "Xato" })
        const { customerImage } = customerOne
        const oldFileName = customerImage.fileName

        Customer.deleteOne({ _id: id }, async () => {
            await deleteOldImage(oldFileName)
            res.status(200).json({ successMessage: 'Delete' })
        })
    })
})

/**
 * @swagger
 * /api/customer/update/{id}:
 *  put:
 *   summary: Mijozlarni id bo'yicha yangilash
 *   tags: [Customer]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema: 
 *         type: string
 *       required: true
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *          schema:
 *            properties:
 *               fullname:
 *                  type: string
 *               region:
 *                  type: string
 *               fog:
 *                  type: string
 *               address:
 *                  type: string
 *               shopNumber:
 *                  type: string
 *               phone:
 *                  type: string
 *               phoneTwo:
 *                  type: string
 *            required: 
 *                  - fullname
 *                  - region
 *                  - fog
 *                  - address
 *                  - shopNumber
 *                  - phone
 *   security:
 *     - bearerAuth: [] 
 *   responses:
 *    200:
 *     description: response 200
 *    500:
 *     description: response 500 
 */

router.put('/update/:id', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AGENT'), (req, res) => {

    const { id } = req.params
    console.log(req.body)

    const {
        fullname,
        region,
        fog,
        address,
        shopNumber,
        phone,
        phoneTwo
    } = req.body

    Customer.findById(id, async (err, customerOne) => {
        if (err) return res.status(400).json({ errorMessage: "Xato" })
        customerOne.fullname = fullname
        customerOne.region = region
        customerOne.fog = fog
        customerOne.address = address
        customerOne.shopNumber = shopNumber
        customerOne.phone = phone
        customerOne.phoneTwo = phoneTwo

        await customerOne.save()
        res.status(200).json({successMessage: 'Yangilandi'})
        
    })
})

module.exports = router