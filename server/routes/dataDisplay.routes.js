const express = require('express')
const { displayFoodData } = require('../controllers/dataDisplay.controller')

const router = express.Router()

router.route('/foodData').post(displayFoodData)

module.exports = router