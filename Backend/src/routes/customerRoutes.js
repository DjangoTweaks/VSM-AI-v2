const router = require('express').Router()
const { getAll, getById, create } = require('../controllers/customersController')
const { createCustomerValidator } = require('../validators/customerValidator')
const validate = require('../middleware/validate')

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', createCustomerValidator, validate, create)

module.exports = router
