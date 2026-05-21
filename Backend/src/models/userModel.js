const supabase = require('../config/supabase')

const findAll = ({ role, status, search } = {}) => {
  let query = supabase.from('users').select('*')
  if (role) query = query.eq('role', role)
  if (status) query = query.eq('status', status)
  if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
  return query.order('created_at', { ascending: false })
}

const findById = (id) =>
  supabase.from('users').select('*').eq('id', id).single()

const create = (data) =>
  supabase.from('users').insert(data).select().single()

const update = (id, data) =>
  supabase.from('users').update({ ...data, updated_at: new Date() }).eq('id', id).select().single()

const remove = (id) =>
  supabase.from('users').delete().eq('id', id)

module.exports = { findAll, findById, create, update, remove }
