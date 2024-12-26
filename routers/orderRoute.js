const express = require("express");
const { placeOrder, verifyOrder, userOrders, listOrder, updateStatus } = require("../controllers/orderController");
const { verifytoken } = require('../middleware/jsonwebtoken')

const router = express.Router();





router.post("/place",verifytoken,placeOrder);

router.post('/verify',verifyOrder)

router.post('/userorders',verifytoken,userOrders)

router.get("/list",listOrder)

router.post("/status",updateStatus)


module.exports = router;
