const router = require('express').Router()
const multer = require('multer')
const { getByCustomer, upload } = require('../controllers/voiceEmbeddingsController')

const memUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isWav = file.mimetype === 'audio/wav'
      || file.mimetype === 'audio/x-wav'
      || file.originalname.toLowerCase().endsWith('.wav')
    cb(isWav ? null : new Error('Only .wav files are allowed'), isWav)
  },
  limits: { fileSize: 50 * 1024 * 1024 },
})

router.get('/customer/:customerId', getByCustomer)
router.post('/', memUpload.single('file'), upload)

module.exports = router
