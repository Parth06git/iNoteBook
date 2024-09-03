const express = require('express')
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const jwtSecret = "Parthis@ceo"

// Router 1: Create a user using: POST "/api/auth/createuser", No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Mail').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 })
], async (req, res) => {

    // If there is any error in auth
    const result = validationResult(req)
    if (!result.isEmpty()) {
        success = false
        res.send({ success, errors: result.array() })
    }

    let success = false

    try {
        // Check if user exist already
        let user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            success = false
            return res.status(400).json({ success, error: "User already exist" })
        }
        else {
            // securing the password with hashing and salt
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)

            // creating a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            success = true
            res.json({ success, authToken })
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }

})

// Router 2: Authenticate a user using: POST "/api/auth/login", No login required
router.post('/login', [
    body('email', 'Enter a valid Mail').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    let success = false

    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.send({ errors: result.array() })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ error: "Please enter the correct details" })
        }
        else {
            const passCom = await bcrypt.compare(password, user.password)
            if (!passCom) {
                success = false
                res.status(400).json({ success, error: "Please enter the correct details" })
            }
            else {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, jwtSecret)
                success = true
                res.json({ success, authToken })
            }
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }

})

// Router 3: Get logged user details using: POST "/api/auth/userdetails", Login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id
        let user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router