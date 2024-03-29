const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const middleware = require('./middleware/file')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const path = require('path')
const cors = require('cors')
const app = express()


const userRouter = require('./routes/User')
const customerRouter = require('./routes/Customer')
const deliverRouter = require('./routes/Delivery')
const chequeRouter = require('./routes/Cheque')
const regionRouter = require('./routes/Region')
const productRouter = require('./routes/Product')
const orderRouter = require('./routes/Order')
const processRouter = require('./routes/Process')
const processDateRouter = require('./routes/ProcessDate')
const processManagerRouter = require('./routes/ProcessManager')

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Delivery',
            description: "Delivery information Api",
            contact: {
                name: "Buxorov Shoxrux"
            },
            servers: ["http://localhost:4000"]
        }
    },
    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use(express.json({extends: true}))
app.use(cors())
app.use(middleware.fields([
    {name: 'customerImage', maxCount: 1},
    {name: 'avatar', maxCount: 1}
]))


if (process.env.NODE_ENV !== 'production')
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/api/user', userRouter)
app.use('/api/customer', customerRouter)
app.use('/api/deliver', deliverRouter)
app.use('/api/cheque', chequeRouter)
app.use('/api/region', regionRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/process', processRouter)
app.use('/api/processDate', processDateRouter)
app.use('/api/processManager', processManagerRouter)
app.use(function(errorMessage, req,res, next){
    res.status(400).json(`server errors: ${errorMessage}`)
})



const PORT = config.get('port') || 4000
app.use('/', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start(){
    await mongoose.connect(config.get('mongoUrl'), 
    { useNewUrlParser: true, useUnifiedTopology: true, replicaSet: 'atlas-13p58z-shard-0'})

    const admin = await User.findOne()
    const passwordHashed = await bcrypt.hash('logo@123', 12)

    if (!admin){
        const user = new User({
            fullname: 'Shavkat',
            login: 'logo@qwer',
            password: passwordHashed,
            phone: '123456789',
            regionId: null,
            position: 'super-admin'
        })
        await user.save()
    }

    console.log("mongodb online")
    app.listen(PORT, () => console.log(`server running ${PORT}`))
}
start()