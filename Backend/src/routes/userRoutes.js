const router = require('express').Router()
const ctrl = require('../controllers/usersController')
const { createUserValidator, updateUserValidator } = require('../validators/userValidator')
const validate = require('../middleware/validate')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.post('/', createUserValidator, validate, ctrl.create)
router.put('/:id', updateUserValidator, validate, ctrl.update)
router.delete('/:id', ctrl.remove)

module.exports = router
