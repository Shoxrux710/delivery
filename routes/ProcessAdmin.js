const {Router} = require('express')
const isAuthMiddleware = require('../middleware/isAuth');
const attachUserMiddleware = require('../middleware/attachUser');
const checkRoleMiddleware = require('../middleware/checkRole');
const ProcessAdmin = require('../models/ProcessAdmin')
const ProcessDate = require('../models/ProcessDate')
const mongoose = require('mongoose')
const nowDate = require('../utils/nowDate')
const router = Router()


// admin tasdiqlash

router.post('/admin', isAuthMiddleware, attachUserMiddleware, checkRoleMiddleware('AA'), async (req,res) => {

    const {id} = req.user
    const {date} = nowDate()

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {processManagers} = req.body

        const processAdmin = new ProcessAdmin({
            adminId: id,
            processManagers
        })

        const {_id: newProcesAdmin} = await processAdmin.save({session})

        const dateProcess = new ProcessDate({
            fromStatus: 'admin',
            toStatus: 'finish',
            date: date,
            userId: id,
            processAdmin: newProcesAdmin
        })

        await dateProcess.save({session})
        await session.commitTransaction()
        res.status(200).json({successMessage: 'admin buyurtmani tugatish'})
        
    } catch (err) {
        await session.abortTransaction()
        res.status(400).json({errorMessage: 'error server'})
    }

    session.endSession()

})

module.exports = router