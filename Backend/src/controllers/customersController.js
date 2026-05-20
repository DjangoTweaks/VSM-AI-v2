const customerService = require('../services/customerService')
const { success } = require('../utils/response')

const getAll = async (req, res, next) => {
  try {
    const data = await customerService.getAll(req.query)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const data = await customerService.getById(req.params.id)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const data = await customerService.create(req.body)
    success(res, data, 201)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getById, create }
