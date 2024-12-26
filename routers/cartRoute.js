const express = require('express')
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController')
const { verifytoken } = require('../middleware/jsonwebtoken')

const router = express.Router()




// add to cart 


router.post('/addtocart',verifytoken,addToCart)

router.post('/removefromcart',verifytoken,removeFromCart)

router.get('/getcart',verifytoken,getCart)





module.exports = router