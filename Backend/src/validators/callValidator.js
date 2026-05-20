const { body } = require('express-validator')

const addNoteValidator = [
  body('content').notEmpty().withMessage('Note content is required'),
]

const reviewValidator = [
  body('decision')
    .isIn(['Approve', 'Reject (Fraud)', 'Escalate'])
    .withMessage('Decision must be Approve, Reject (Fraud), or Escalate'),
  body('notes').optional(),
]

module.exports = { addNoteValidator, reviewValidator }
