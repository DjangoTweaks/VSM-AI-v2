const verificationService = require('../services/verificationService')
const { success } = require('../utils/response')

const getByCall = async (req, res, next) => {
  try {
    const data = await verificationService.getByCall(req.params.callId)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const getFlaggedCalls = async (req, res, next) => {
  try {
    const data = await verificationService.getFlaggedCalls(req.query)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const getCaseById = async (req, res, next) => {
  try {
    const data = await verificationService.getCaseById(req.params.id)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const submitReview = async (req, res, next) => {
  try {
    const data = await verificationService.submitReview(req.params.id, req.user.id, req.body)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

module.exports = { getByCall, getFlaggedCalls, getCaseById, submitReview }
