const express = require('express')
const { addFood, listFood, removeFood } = require('../controllers/foodController')
const upload = require('../middleware/multer')

const router = express.Router()




router.post('/add',upload.single('image'),addFood)

router.get('/list',listFood)

router.post('/remove',removeFood)


module.exports = router