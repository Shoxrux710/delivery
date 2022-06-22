const { Router } = require('express')
const Customer = require('../models/Customer')
const { customerValidator } = require('../utils/validator')
const { validationResult } = require('express-validator')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const config = require('config');
const path = require('path')
const fs = require('fs');
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
 *      regionId:
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
 *      - regionId
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

    console.log(req.body)
    console.log(req.files)
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), errorMessage: `Please fill in` })

    const { fullname, regionId, fog, address, shopNumber, phone, phoneTwo } = req.body
    const { filename } = req.files.customerImage[0]

    const customer = new Customer({
        fullname,
        regionId,
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
 *   parameters:
 *     - in: query
 *       name: regionId
 *       schema:
 *         type: string
 *       required: true
 *   responses:
 *    200:
 *     description: response 200
 *    500:
 *     description: response 500 
 */

router.get('/', async (req, res) => {

    const {regionId} = req.query

    const customer = await Customer.find({regionId: regionId})
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
 *               regionId:
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
 *                  - regionId
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
        regionId,
        fog,
        address,
        shopNumber,
        phone,
        phoneTwo
    } = req.body

    Customer.findById(id, async (err, customerOne) => {
        if (err) return res.status(400).json({ errorMessage: "Xato" })
        customerOne.fullname = fullname
        customerOne.regionId = regionId
        customerOne.fog = fog
        customerOne.address = address
        customerOne.shopNumber = shopNumber
        customerOne.phone = phone
        customerOne.phoneTwo = phoneTwo

        await customerOne.save()
        res.status(200).json({successMessage: 'Yangilandi'})
        
    })
})

/**
 * @swagger
 * /api/customer/filter:
 *  get:
 *   summary: fullname bo'yicha filter qilish
 *   tags: [Customer]
 *   parameters:
 *     - in: query
 *       name: pagination
 *       schema:
 *         type: object
 *         required: 
 *            - filter
 *            - regionId
 *         properties:
 *           filter:
 *              type: string
 *           regionId:
 *              type: string  
 *   responses:
 *    200:
 *     description: response 200
 *    500:
 *     description: response 500 
 */

 router.get('/filter', async (req,res) => {
    
    const {filter, regionId} = req.query

    const customersFilter = await Customer.find({fullname: {$regex: `${filter}`}, regionId: regionId})
    res.status(200).json({customersFilter})

})

/**
 * @swagger
 * /api/customer/{id}:
 *  get:
 *   summary: Xaridorlarni id bo'yicha chiqarib beradi
 *   tags: [Customer]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *   responses:
 *    200:
 *     description: response 200
 *    500:
 *     description: response 500 
 * 
 */


router.get('/:id', async (req,res) => {
    const {id} = req.params

    const customerId = await Customer.findOne({_id: id}).populate('regionId', 'name')
    res.status(200).json({customerId})

})


module.exports = router