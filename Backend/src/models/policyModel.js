const supabase = require('../config/supabase')

const findAll = (customerId) => {
  let query = supabase.from('policies').select('*, customers(first_name, last_name, email)')
  if (customerId) query = query.eq('customer_id', customerId)
  return query.order('created_at', { ascending: false })
}

const findById = (id) =>
  supabase.from('policies').select('*, customers(*)').eq('id', id).single()

const create = (data) =>
  supabase.from('policies').insert(data).select().single()

module.exports = { findAll, findById, create }
