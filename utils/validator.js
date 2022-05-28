const {body} = require('express-validator')

exports.userValidator = [
    body('fullname').isLength({min: 1}),
    body('login').isLength({min: 1}),
    body('password').isLength({min: 1}),
    body('regionId').isLength({min: 1}),
    body('phone').isLength({min: 1}),
    body('position').isLength({min: 1})
]   
exports.customerValidator = [
    body('fullname').isLength({min: 1}),
    body('region').isLength({min: 1}),
    body('fog').isLength({min: 1}),
    body('address').isLength({min: 1}),
    body('shopNumber').isLength({min: 1}),
    body('phone').isLength({min: 1})
] 
exports.loginValidator = [
    body('login').isLength({min: 1}),
    body('password').isLength({min: 1})
]
exports.productValidator = [
    body('name').isLength({min: 1}),
    body('price').isLength({min: 1})
]