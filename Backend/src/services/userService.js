const supabase = require('../config/supabase')
const userModel = require('../models/userModel')
const { NotFoundError, AppError } = require('../utils/errors')

const getAll = async (filters) => {
  const { data, error } = await userModel.findAll(filters)
  if (error) throw new AppError('Failed to fetch users')
  return data
}

const getById = async (id) => {
  const { data, error } = await userModel.findById(id)
  if (error || !data) throw new NotFoundError('User')
  return data
}

const create = async (payload) => {
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: payload.email,
    password: payload.password,
    email_confirm: true,
  })
  if (authError) throw new AppError(authError.message || 'Failed to create auth user')

  const { data, error } = await userModel.create({
    id: authData.user.id,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    status: 'Active',
  })

  if (error) {
    await supabase.auth.admin.deleteUser(authData.user.id)
    throw new AppError(error.message || 'Failed to create user profile')
  }

  return data
}

const update = async (id, payload) => {
  const updates = {}
  if (payload.name) updates.name = payload.name
  if (payload.role) updates.role = payload.role
  if (payload.status) updates.status = payload.status

  const { data, error } = await userModel.update(id, updates)
  if (error || !data) throw new AppError('Failed to update user')
  return data
}

const remove = async (id) => {
  const { error: authError } = await supabase.auth.admin.deleteUser(id)
  if (authError) throw new AppError('Failed to delete auth user')

  const { error } = await userModel.remove(id)
  if (error) throw new AppError('Failed to delete user profile')
}

module.exports = { getAll, getById, create, update, remove }
