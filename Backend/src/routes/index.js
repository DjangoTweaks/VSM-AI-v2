const router = require('express').Router()

router.use('/auth', require('./authRoutes'))
router.use('/dashboard', require('./dashboardRoutes'))
router.use('/customers', require('./customerRoutes'))
router.use('/policies', require('./policyRoutes'))
router.use('/voice-embeddings', require('./voiceEmbeddingRoutes'))
router.use('/calls', require('./callRoutes'))
router.use('/verification', require('./verificationRoutes'))
router.use('/users', require('./userRoutes'))

module.exports = router
