const voiceEmbeddingModel = require('../models/voiceEmbeddingModel')
const { AppError } = require('../utils/errors')

const BUCKET = 'voice-files'
const QDRANT_URL = 'https://cayla-crawlier-stephenie.ngrok-free.dev/voice-embeddings/insert'

const getByCustomer = async (customerId) => {
  const { data, error } = await voiceEmbeddingModel.findByCustomer(customerId)
  if (error) throw new AppError('Failed to fetch voice embeddings')
  return data
}

const callQdrantService = async (file) => {
  const blob = new Blob([file.buffer], { type: file.mimetype })
  const form = new FormData()
  form.append('file', blob, file.originalname)

  console.log('[Qdrant] Sending request to:', QDRANT_URL)

  const res = await fetch(QDRANT_URL, {
    method: 'POST',
    body: form,
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  })

  const text = await res.text()
  console.log('[Qdrant] Status:', res.status)
  console.log('[Qdrant] Raw response:', text)

  if (!res.ok) throw new AppError(`Qdrant service returned ${res.status}: ${text}`)

  try {
    return JSON.parse(text)
  } catch {
    return text.trim()
  }
}

const upload = async (file, payload) => {
  const filePath = `${payload.customerId}/${Date.now()}-${file.originalname}`

  // Run Supabase upload and Qdrant call in parallel
  const [fileUrl, qdrantId] = await Promise.all([
    voiceEmbeddingModel.uploadFile(BUCKET, filePath, file.buffer, file.mimetype),
    callQdrantService(file),
  ])

  console.log('[Enrollment] fileUrl:', fileUrl)
  console.log('[Enrollment] qdrantId:', qdrantId)

  const { data, error } = await voiceEmbeddingModel.create({
    customer_id: payload.customerId,
    policy_id: payload.policyId || null,
    file_url: fileUrl,
    file_name: file.originalname,
    file_size: file.size,
    consent_given: payload.consentGiven === 'true' || payload.consentGiven === true,
    qdrant_id: qdrantId,
  })
  if (error) throw new AppError(error.message || 'Failed to store voice embedding')
  return data
}

module.exports = { getByCustomer, upload }
