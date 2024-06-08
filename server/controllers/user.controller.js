const { validationResult } = require('express-validator')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const salt = await bcrypt.genSalt(10)
    let securePassword = await bcrypt.hash(req.body.password, salt)

    try {
        await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email,
            location: req.body.location
        }).then(res.json({success: true}))
    } catch (error) {
        console.log('Error occured', error)
        res.json({success: false})
    }
}

const loginUser = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { email, password } = req.body
        const userData = await User.findOne({email})
        if (!userData) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, userData.password)
        if ( !passwordCompare ) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" })
        }

        const data = {
            user: {
                id: userData._id
            }
        }
        console.log(data.user.id)

        const authToken = jwt.sign(data, process.env.JWT_AUTHORIZATION_SECRET)

        return res.json({ success: true, authToken: authToken })

    } catch (error) {
        console.log('Some error occured while logging in!!!', error)
        return status(400).json({ success: false })
    }   
}

module.exports = {
    createUser,
    loginUser
}