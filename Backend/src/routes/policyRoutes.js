const router = require('express').Router()
const { getAll, getById, create } = require('../controllers/policiesController')
const { createPolicyValidator } = require('../validators/policyValidator')
const validate = require('../middleware/validate')

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', createPolicyValidator, validate, create)

module.exports = router
