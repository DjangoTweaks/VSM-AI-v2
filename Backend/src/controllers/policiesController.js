const policyService = require('../services/policyService')
const { success } = require('../utils/response')

const getAll = async (req, res, next) => {
  try {
    const data = await policyService.getAll(req.query.customerId)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const data = await policyService.getById(req.params.id)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const data = await policyService.create(req.body)
    success(res, data, 201)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getById, create }
