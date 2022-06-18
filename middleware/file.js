const multer = require('multer')
const config = require('config')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       if (file.fieldname === 'customerImage'){
           cb(null, './uploads/customer')
       }
       if (file.fieldname === 'avatar'){
           cb(null, './uploads/user')
       }
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']


const fileFilter = (req, file, cb) => {

    if (allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

module.exports = multer({storage, fileFilter})