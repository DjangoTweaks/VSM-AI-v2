const router = require('express').Router()
const { body } = require('express-validator')
const { register, getLive } = require('../controllers/liveCallsController')
const validate = require('../middleware/validate')

router.get('/', getLive)

router.post('/',
  [
    body('phone_number').notEmpty().withMessage('phone_number is required'),
    body('qdrant_id').notEmpty().withMessage('qdrant_id is required'),
    body('confidence_score').optional().isFloat({ min: 0, max: 100 }).withMessage('confidence_score must be 0–100'),
  ],
  validate,
  register
)

module.exports = router
