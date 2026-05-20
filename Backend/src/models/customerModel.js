const supabase = require('../config/supabase')

const findAll = ({ search } = {}) => {
  let query = supabase.from('customers').select('*')
  if (search) query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`)
  return query.order('created_at', { ascending: false })
}

const findById = (id) =>
  supabase.from('customers').select('*, policies(*)').eq('id', id).single()

const create = (data) =>
  supabase.from('customers').insert(data).select().single()

const update = (id, data) =>
  supabase.from('customers').update({ ...data, updated_at: new Date() }).eq('id', id).select().single()

module.exports = { findAll, findById, create, update }
