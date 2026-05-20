const { body } = require('express-validator')

const createCustomerValidator = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('dateOfBirth').optional().isISO8601().withMessage('Invalid date format'),
]

module.exports = { createCustomerValidator }
