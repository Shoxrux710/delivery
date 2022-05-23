const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const app = express()


const userRouter = require('./routes/User')
const regionRouter = require('./routes/Region')

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/api/user', userRouter)
app.use('/api/region', regionRouter)
app.use(function(errorMessage, req,res, next){
    res.status(400).json(`server ${errorMessage}`)
})



const PORT = 4000

async function start(){
    await mongoose.connect("mongodb://localhost:27017/delivery", 
    { useNewUrlParser: true, useUnifiedTopology: true})

    const admin = await User.findOne()
    const passwordHashed = await bcrypt.hash('logo@123', 12)

    if (!admin){
        const user = new User({
            fullname: 'Shavkat',
            login: 'logo@qwer',
            password: passwordHashed,
            phone: '123456789',
            regionId: null,
            position: 'admin'
        })
        await user.save()
    }

    console.log("mongodb online")
    app.listen(PORT, () => console.log(`server running ${PORT}`))
}
start()