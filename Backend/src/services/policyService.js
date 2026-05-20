const policyModel = require('../models/policyModel')
const { NotFoundError, AppError } = require('../utils/errors')

const getAll = async (customerId) => {
  const { data, error } = await policyModel.findAll(customerId)
  if (error) throw new AppError('Failed to fetch policies')
  return data
}

const getById = async (id) => {
  const { data, error } = await policyModel.findById(id)
  if (error || !data) throw new NotFoundError('Policy')
  return data
}

const create = async (payload) => {
  const { data, error } = await policyModel.create({
    policy_number: payload.policyNumber,
    customer_id: payload.customerId,
    plan_type: payload.planType,
    agent_name: payload.agentName || null,
    enrollment_date: payload.enrollmentDate || new Date().toISOString().split('T')[0],
  })
  if (error) throw new AppError(error.message || 'Failed to create policy')
  return data
}

module.exports = { getAll, getById, create }
