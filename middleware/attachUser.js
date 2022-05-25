const User = require('../models/User')


module.exports = (req, res, next) => {

    User.findOne({_id: req.decodedUser.id}, (err, user) => {
        if (err) return res.sendStatus(500)
        if (!user) return res.sendStatus(401)
        req.user = user
        next()
    })
}