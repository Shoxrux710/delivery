const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!req.headers.authorization) return res.sendStatus(401)

    const token = authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

    jwt.verify(token, config.get('jsonwebtoken'), (err, user) => {
        if (err) return res.sendStatus(403)
        req.decodedUser = {id: user.id}
        next()
    })
}