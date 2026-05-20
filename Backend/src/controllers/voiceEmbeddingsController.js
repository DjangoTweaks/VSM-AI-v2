const voiceEmbeddingService = require('../services/voiceEmbeddingService')
const { success } = require('../utils/response')
const { ValidationError } = require('../utils/errors')

const getByCustomer = async (req, res, next) => {
  try {
    const data = await voiceEmbeddingService.getByCustomer(req.params.customerId)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const upload = async (req, res, next) => {
  try {
    if (!req.file) throw new ValidationError('Voice file (.wav) is required')
    const data = await voiceEmbeddingService.upload(req.file, req.body)
    success(res, data, 201)
  } catch (err) {
    next(err)
  }
}

module.exports = { getByCustomer, upload }
