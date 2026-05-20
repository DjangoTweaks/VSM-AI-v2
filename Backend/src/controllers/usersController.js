const userService = require('../services/userService')
const { success } = require('../utils/response')

const getAll = async (req, res, next) => {
  try {
    const data = await userService.getAll(req.query)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const data = await userService.getById(req.params.id)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const data = await userService.create(req.body)
    success(res, data, 201)
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const data = await userService.update(req.params.id, req.body)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    await userService.remove(req.params.id)
    success(res, { message: 'User deleted successfully' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getById, create, update, remove }
