const { body } = require('express-validator')

const createUserValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role').isIn(['Manager', 'Agent']).withMessage('Role must be Manager or Agent'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
]

const updateUserValidator = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('role').optional().isIn(['Manager', 'Agent']).withMessage('Role must be Manager or Agent'),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Status must be Active or Inactive'),
]

module.exports = { createUserValidator, updateUserValidator }
