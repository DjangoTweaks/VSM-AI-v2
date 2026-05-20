const verificationModel = require('../models/verificationModel')
const { NotFoundError, AppError } = require('../utils/errors')

const getByCall = async (callId) => {
  const { data, error } = await verificationModel.findByCall(callId)
  if (error) throw new AppError('Failed to fetch verification data')
  return data
}

const getFlaggedCalls = async (filters) => {
  const { data, error } = await verificationModel.findFlaggedCalls(filters)
  if (error) throw new AppError('Failed to fetch flagged calls')
  return data
}

const getCaseById = async (id) => {
  const { data, error } = await verificationModel.findFlaggedById(id)
  if (error || !data) throw new NotFoundError('Case')
  return data
}

const submitReview = async (caseId, userId, payload) => {
  const statusMap = {
    'Approve': 'Approved',
    'Reject (Fraud)': 'Rejected',
    'Escalate': 'Escalated',
  }

  const { data, error } = await verificationModel.updateFlagged(caseId, {
    status: statusMap[payload.decision],
    decision: payload.decision,
    reviewed_by: userId,
    reviewed_at: new Date().toISOString(),
  })
  if (error || !data) throw new AppError('Failed to submit review')
  return data
}

module.exports = { getByCall, getFlaggedCalls, getCaseById, submitReview }
