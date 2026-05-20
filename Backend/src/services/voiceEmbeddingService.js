const voiceEmbeddingModel = require('../models/voiceEmbeddingModel')
const { AppError } = require('../utils/errors')

const BUCKET = 'voice-files'

const getByCustomer = async (customerId) => {
  const { data, error } = await voiceEmbeddingModel.findByCustomer(customerId)
  if (error) throw new AppError('Failed to fetch voice embeddings')
  return data
}

const upload = async (file, payload) => {
  const filePath = `${payload.customerId}/${Date.now()}-${file.originalname}`

  const fileUrl = await voiceEmbeddingModel.uploadFile(
    BUCKET,
    filePath,
    file.buffer,
    file.mimetype
  )

  const { data, error } = await voiceEmbeddingModel.create({
    customer_id: payload.customerId,
    policy_id: payload.policyId || null,
    file_url: fileUrl,
    file_name: file.originalname,
    file_size: file.size,
    consent_given: payload.consentGiven === 'true' || payload.consentGiven === true,
  })
  if (error) throw new AppError(error.message || 'Failed to store voice embedding')
  return data
}

module.exports = { getByCustomer, upload }
