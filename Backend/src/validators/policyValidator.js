const { body } = require('express-validator')

const PLAN_TYPES = ['Term Life', 'Whole Life', 'Universal Life', 'Health', 'Auto', 'Home']

const createPolicyValidator = [
  body('policyNumber').notEmpty().withMessage('Policy number is required'),
  body('customerId').isUUID().withMessage('Valid customer ID is required'),
  body('planType').isIn(PLAN_TYPES).withMessage(`Plan type must be one of: ${PLAN_TYPES.join(', ')}`),
  body('agentName').optional(),
  body('enrollmentDate').optional().isISO8601().withMessage('Invalid date format'),
]

module.exports = { createPolicyValidator }
