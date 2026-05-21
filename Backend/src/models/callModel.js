const supabase = require('../config/supabase')

const findAll = ({ status, agentId, customerId } = {}) => {
  let query = supabase.from('calls').select(`
    *,
    customers(first_name, last_name),
    users(name, email)
  `)
  if (status) query = query.eq('status', status)
  if (agentId) query = query.eq('agent_id', agentId)
  if (customerId) query = query.eq('customer_id', customerId)
  return query.order('created_at', { ascending: false })
}

const findById = (id) =>
  supabase.from('calls').select(`
    *,
    customers(first_name, last_name, email, phone),
    users(name, email)
  `).eq('id', id).single()

const create = (data) =>
  supabase.from('calls').insert(data).select().single()

const update = (id, data) =>
  supabase.from('calls').update(data).eq('id', id).select().single()

const getTranscripts = (callId) =>
  supabase.from('call_transcripts').select('*').eq('call_id', callId).order('created_at', { ascending: true })

const addTranscript = (data) =>
  supabase.from('call_transcripts').insert(data).select().single()

const getNotes = (callId) =>
  supabase.from('call_notes').select('*, users(name)').eq('call_id', callId).order('created_at', { ascending: false })

const addNote = (data) =>
  supabase.from('call_notes').insert(data).select().single()

module.exports = { findAll, findById, create, update, getTranscripts, addTranscript, getNotes, addNote }
