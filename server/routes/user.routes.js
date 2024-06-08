const express = require('express')
const { body } = require('express-validator')
const { createUser, loginUser } = require('../controllers/user.controller')

const router = express.Router()

router.route('/createuser').post([body("email", "Invalid email").isEmail(), body("password").isLength({ min: 5 })], createUser)

router.route('/loginuser').post([body("email", "Invalid email").isEmail(), body("password").isLength({ min: 5 })], loginUser)

module.exports = router

