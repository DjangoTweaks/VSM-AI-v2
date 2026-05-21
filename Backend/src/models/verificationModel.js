const supabase = require('../config/supabase')

const findByCall = (callId) =>
  supabase.from('voice_verifications').select('*').eq('call_id', callId).order('verified_at', { ascending: false })

const create = (data) =>
  supabase.from('voice_verifications').insert(data).select().single()

const findFlaggedCalls = ({ status } = {}) => {
  let query = supabase.from('flagged_calls').select(`
    *,
    calls(call_id, start_time, customers(first_name, last_name))
  `)
  if (status) query = query.eq('status', status)
  return query.order('created_at', { ascending: false })
}

const findFlaggedById = (id) =>
  supabase.from('flagged_calls').select(`
    *,
    calls(*, customers(first_name, last_name, email, phone), users(name, email)),
    users(name)
  `).eq('id', id).single()

const createFlagged = (data) =>
  supabase.from('flagged_calls').insert(data).select().single()

const updateFlagged = (id, data) =>
  supabase.from('flagged_calls').update(data).eq('id', id).select().single()

module.exports = { findByCall, create, findFlaggedCalls, findFlaggedById, createFlagged, updateFlagged }
