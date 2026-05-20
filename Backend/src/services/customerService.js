const customerModel = require('../models/customerModel')
const { NotFoundError, AppError } = require('../utils/errors')

const getAll = async (filters) => {
  const { data, error } = await customerModel.findAll(filters)
  if (error) throw new AppError('Failed to fetch customers')
  return data
}

const getById = async (id) => {
  const { data, error } = await customerModel.findById(id)
  if (error || !data) throw new NotFoundError('Customer')
  return data
}

const create = async (payload) => {
  const { data, error } = await customerModel.create({
    first_name: payload.firstName,
    last_name: payload.lastName,
    phone: payload.phone,
    email: payload.email,
    date_of_birth: payload.dateOfBirth || null,
  })
  if (error) throw new AppError(error.message || 'Failed to create customer')
  return data
}

module.exports = { getAll, getById, create }
