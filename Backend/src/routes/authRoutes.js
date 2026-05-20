const router = require('express').Router()
const { body } = require('express-validator')
const { login } = require('../controllers/authController')
const validate = require('../middleware/validate')

router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  login
)

module.exports = router
