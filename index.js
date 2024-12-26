require('dotenv').config()
const express = require('express')
const app = express()

// connect with frontend 

const cors = require('cors')

require('./db/connection')

const foodRoute = require('./routers/foodRoute')

const userRoute = require('./routers/userRoute')

const cartRouter = require('./routers/cartRoute')

const orderRouter = require('./routers/orderRoute')

app.use(cors())

// convert all incoming data 

app.use(express.json())

app.use('/api/food',foodRoute)

app.use('/api/user',userRoute)


app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouter)


app.use(express.static('./uploads'))














const PORT = 8001  || process.env.PORT

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY ON ${PORT}`);
    
})