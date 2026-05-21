const router = require('express').Router()
const { getStats, getFlaggedCalls } = require('../controllers/dashboardController')

router.get('/stats', getStats)
router.get('/flagged-calls', getFlaggedCalls)

module.exports = router
