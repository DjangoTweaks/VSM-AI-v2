const callService = require('../services/callService')
const { success } = require('../utils/response')

const getAll = async (req, res, next) => {
  try {
    const data = await callService.getAll(req.query)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const data = await callService.getById(req.params.id)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const getTranscript = async (req, res, next) => {
  try {
    const data = await callService.getTranscript(req.params.id)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const getNotes = async (req, res, next) => {
  try {
    const data = await callService.getNotes(req.params.id)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const addNote = async (req, res, next) => {
  try {
    const data = await callService.addNote(req.params.id, null, req.body.content)
    success(res, data, 201)
  } catch (err) {
    next(err)
  }
}

const endCall = async (req, res, next) => {
  try {
    const data = await callService.endCall(req.params.id)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getById, getTranscript, getNotes, addNote, endCall }
