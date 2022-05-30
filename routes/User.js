const {Router} = require('express')
const {validationResult} = require('express-validator')
const {userValidator, loginValidator} = require('../utils/validator')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const config = require('config');
const router = Router()

const deleteOldImage = (fileName) => {
    return new Promise((resolve, rejects) => {
        fs.unlink(path.join(__dirname, `../client/${config.get('imgFolder')}/avatar/${fileName}`), err => {
            resolve()
        })
    })
}

// const customPromise = () => {
//     return new Promise((resolve, rejected) => {
//         const random = Math.random();
//         if (random < 0.7) {
//             resolve('Тугри ишлади')
//         } else {
//             rejected('Хато ишлади')
//         }
//     });
// }

// await customPromise().then((result) => console.log(result))
//                .catch((err) => console.log(err));


/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth: 
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  security: 
 *    - bearerAuth: [] 
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        fullname:
 *           type: string
 *        login:
 *           type: string
 *        password:
 *           type: string
 *        regionId:
 *           type: string
 *        phone: 
 *           type: string
 *        worker:
 *           type: array
 *        avatar:
 *           type: string
 *           format: binary
 *        position:
 *           type: string
 *           description: (manager, agent, courier) lardan birini kiriting 
 *      required:
 *           - fullname
 *           - login
 *           - password
 *           - regionId
 *           - phone
 *           - position
 *      example:
 *           fullname: fullname
 *           login: logoit
 *           password: logo123
 *           regionId: tashkent
 *           phone: "7777777"
 *           position: manager
 *           worker: []
 *           avatar: null  
 *                             
 */

/**
 * @swagger
 * /api/user/register:
 *  post:
 *   summary: hodimlarni ro'yxatdan o'tkazish
 *   tags: [User]
 *   requestBody:
 *     required: true
 *     content:
 *        application/json:
 *           schema:
 *              type: object
 *              $ref: "#/components/schemas/User"
 *   security: 
 *    - bearerAuth: []
 *   responses:
 *      200:
 *         description: response 200
 *      400: 
 *         description: response 400
 *      500:
 *         description: response 500    
 */
// register
router.post('/register', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AB'), userValidator, async (req, res) => {

    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array(), errorMessage: `Please fill in`})
    }

    const {fullname, login, password, regionId, phone, position, worker} = req.body

    const user = await User.findOne({login})
    
    if (user){return res.status(400).json({errorMessage: 'User already'})}
    const passwordHashed = await bcrypt.hash(password, 12)

    const newUser = new User({
        fullname,
        login,
        regionId,
        phone,
        worker,
        position,
        password: passwordHashed
    })

    await newUser.save((err) => {
        if (err) return res.status(400).json({errorMessage: "Xato"})
        res.status(200).json({successMessage: "Register success"})
    })

})

/**
 * @swagger
 * /api/user/login:
 *  post:
 *   summary: tizimga kirish
 *   tags: [User]
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              properties:
 *                  login:
 *                     type: string
 *                  password:
 *                     type: string
 *              required:
 *                  - login
 *                  - password
 *   responses:
 *      200:
 *         description: response 200
 *      400: 
 *         description: response 400
 *      500:
 *         description: response 500 
 */
//login
router.post("/login", loginValidator, async (req,res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()){return res.status(400).json({errors: errors.array(), errorMessage: `Please fill in`})}

    const {login, password} = req.body

    const user = await User.findOne({login})

    if (!user){return res.status(400).json({errorMessage: "Please login..."}) }

    const match = await bcrypt.compare(password, user.password)
    if (!match){return res.status(400).json({errorMessage: "inCorrect password"})}

    const payload = {id: user._id}

    const token = jwt.sign(payload, config.get('jsonwebtoken'))
    res.status(200).json({
        token,
        position: user.position,
        id: user._id,
        successMessage: "User Loggedin Succesfully"
    })

})

/**
 * @swagger
 * /api/user/userId/{id}:
 *  get:
 *   summary: Har bir foydalanuvchini ma'lumotlarini chiqarib beradi
 *   tags: [User]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *   responses:
 *      200:
 *         description: response 200
 *      400: 
 *         description: response 400
 *      500:
 *         description: response 500    
 */
router.get('/userId/:id', async(req,res) => {
    const {id} = req.params

    const userId = await User.findOne({_id: id}).populate('regionId', 'name')
    .populate({path: 'worker', select: 'fullname login position', populate: [{path: 'regionId', select: 'name'}]})
    res.status(200).json({userId})
})

/**
 * @swagger
 * /api/user/images/{id}:
 *  put:
 *   summary: user profilni yangilash
 *   tags: [User]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *   requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *             properties:
 *                avatar:
 *                   type: string
 *             required:
 *                - avatar
 *   responses:
 *        200:
 *          description: response 200
 *        400:
 *          description: response 400
 *        500:
 *          description: response 500          
 */

router.put('/images/:id', (req, res) => {
    const {id} = req.params

    User.findById(id, (err, userOne) => {
        if (err) return res.status(400).json({errorMessage: 'Xato'})

        const {avatar} = userOne
        const oldFileName = avatar.fileName

        const filename = req.files.avatar ? req.files.avatar[0] : oldFileName

        userOne.avatar = {
            fileName: filename
        }

        userOne.save(async(err) => {
            if (err) return res.status(400).json({errorMessage: 'Xato'})
            req.files.avatar ? await deleteOldImage(oldFileName) : null
            res.status(200).json({successMessage: 'Yangilandi'})
        })
    })
})

/**
 * @swagger
 * /api/user/employee:
 *  get:
 *   summary: hodimlarni viloyat bo'yicha saralash
 *   tags: [User]
 *   parameters:
 *     - in: query
 *       name: pagination
 *       schema:
 *         type: object
 *       required: 
 *         - attach
 *         - userId
 *       properties:
 *          attach:
 *            type: string
 *          userId:
 *            type: string
 *       example:
 *          attach: string
 *          userId: string
 *   responses:
 *        200:
 *          description: response 200   
 *        500:
 *          description: response 500     
 */

router.get('/employee', async (req,res) => {
    
    const {attach, userId} = req.query

    const employee = await User.find({position: attach, regionId: userId})
    res.status(200).json({employee})

})

/**
 * @swagger
 * /api/user/each:
 *  get:
 *   summary: hodimlarni roli bo'yicha chiqarib berish
 *   tags: [User]
 *   parameters:
 *     - in: query
 *       name: pagination
 *       schema: 
 *          type: object
 *       required:
 *         - position
 *       properties:
 *          position:
 *             type: string
 *          regionId:
 *             type: string 
 *   responses:
 *        200:
 *          description: response 200   
 *        500:
 *          description: response 500 
 */

router.get('/each', async (req,res) => {

    console.log(req.query)
    const {position, regionId} = req.query
    console.log(regionId)
    const filterId = regionId ? {regionId: regionId} : {}
    console.log(filterId)

    const userEach = await User.find({position: position, ...filterId})
    const count = await User.find({position: position, ...filterId}).countDocuments()
    res.status(200).json({
        userEach,
        count
    })
})

/**
 * @swagger
 * /api/user/all:
 *  get:
 *   summary: hodimlarni hammasini chiqarish
 *   tags: [User]
 *   responses:
 *        200:
 *          description: response 200  
 *        500:
 *          description: response 500  
 */

router.get('/all', async (req, res) => {

    const userAll = await User.find().populate('regionId', 'name')
    res.status(200).json({userAll})
})

module.exports = router