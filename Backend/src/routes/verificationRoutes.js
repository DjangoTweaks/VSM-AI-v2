const router = require('express').Router()
const ctrl = require('../controllers/verificationController')
const { reviewValidator } = require('../validators/callValidator')
const validate = require('../middleware/validate')

router.get('/calls/:callId', ctrl.getByCall)
router.get('/flagged-calls', ctrl.getFlaggedCalls)
router.get('/case/:id', ctrl.getCaseById)
router.post('/review/:id', reviewValidator, validate, ctrl.submitReview)

module.exports = router
