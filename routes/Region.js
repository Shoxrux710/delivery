const {Router} = require('express')
const Region = require('../models/Region')
const router = Router()



/**
 * @swagger
 * /api/region/name:
 *  post:
 *   summary: viloyat kiritish
 *   tags: [Region]
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             properties:
 *                name:
 *                  type: string
 *             required: 
 *               - name
 *             example:
 *                name: Tashkent      
 *   responses:
 *      200:
 *         description: response 200
 *      400: 
 *         description: response 400
 *      500:
 *         description: response 500 
 */

router.post('/name', (req, res) => {
    
    console.log(req.body)

    const newRegion = new Region(req.body)
    
    newRegion.save(async(err) => {
        if (err) return res.status(400).json({errorMessage: "Xato"})
        res.status(200).json({successMessage: "yuborildi"})
    })
})

/**
 * @swagger
 * /api/region/all:
 *  get:
 *   summary: viloyatlarni hammasini chiqarib beradi
 *   tags: [Region]
 *   responses:
 *        200:
 *          description: response 200   
 *        500:
 *          description: response 500  
 */
router.get('/all', async (req,res) => {

    const region = await Region.find()
    res.status(200).json({region})
})

/**
 * @swagger
 * /api/region/delete/{id}:
 *  delete:
 *    summary: viloyatni o'chirish
 *    tags: [Region]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *    responses:
 *        200:
 *          description: response 200   
 *        500:
 *          description: response 500  
 *   
 */ 

router.delete('/delete/:id', (req, res) => {

    const {id} = req.params

    Region.deleteOne({_id: id}, (err) => {
        if (err) return res.status(400).json({errorMessage: "Xato"})
        res.status(200).json({successMessage: "Delete"})
    })

})

module.exports = router