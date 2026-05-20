const router = require('express').Router()
const ctrl = require('../controllers/callsController')
const { addNoteValidator } = require('../validators/callValidator')
const validate = require('../middleware/validate')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.get('/:id/transcript', ctrl.getTranscript)
router.get('/:id/notes', ctrl.getNotes)
router.post('/:id/notes', addNoteValidator, validate, ctrl.addNote)
router.post('/:id/end', ctrl.endCall)

module.exports = router
