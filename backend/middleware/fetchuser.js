const jwt = require('jsonwebtoken')
const jwtSecret = "Parthis@ceo"

const fetchuser = (req, res, next) => {
    // Get user from jwt token and  add id to req object
    const token = req.header('authToken')
    if (!token) {
        res.status(401).send("Please use a valid details")
    }
    try {
        const data = jwt.verify(token, jwtSecret)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send("Please use a valid details")
    }
}

module.exports = fetchuser