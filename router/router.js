const router = require('express').Router()
const server = require('../server')
const fileController = require('../controller/fileController')

const multer = require('multer')
var multer1 = multer()
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}--${file.originalname}`)
  }
})
const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/tiff' || file.mimetype == 'image/png') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .tiff and .png format allowed!'))
    }
  }
})
//convert .tiff to png
router.post(
  '/readFileContent1',
  uploadFile.single('path'),
  fileController.readFile
)
//convert png to blob
router.post('/convert',uploadFile.single('path'),fileController.convert);

module.exports = router
