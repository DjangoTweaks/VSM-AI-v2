const callModel = require('../models/callModel')
const { NotFoundError, AppError } = require('../utils/errors')

const getAll = async (filters) => {
  const { data, error } = await callModel.findAll(filters)
  if (error) throw new AppError('Failed to fetch calls')
  return data
}

const getById = async (id) => {
  const { data, error } = await callModel.findById(id)
  if (error || !data) throw new NotFoundError('Call')
  return data
}

const getTranscript = async (callId) => {
  const { data, error } = await callModel.getTranscripts(callId)
  if (error) throw new AppError('Failed to fetch transcript')
  return data
}

const getNotes = async (callId) => {
  const { data, error } = await callModel.getNotes(callId)
  if (error) throw new AppError('Failed to fetch notes')
  return data
}

const addNote = async (callId, userId, content) => {
  const { data, error } = await callModel.addNote({ call_id: callId, user_id: userId, content })
  if (error) throw new AppError('Failed to add note')
  return data
}

const endCall = async (id) => {
  const { data, error } = await callModel.update(id, {
    status: 'Completed',
    is_live: false,
    end_time: new Date().toISOString(),
  })
  if (error || !data) throw new AppError('Failed to end call')
  return data
}

module.exports = { getAll, getById, getTranscript, getNotes, addNote, endCall }
