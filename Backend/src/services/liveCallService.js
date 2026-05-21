const supabase = require('../config/supabase')
const { AppError } = require('../utils/errors')

const scoreCache = new Map()

const genCallId = () => {
  const num = Math.floor(1000 + Math.random() * 9000)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const suffix = Array.from({ length: 2 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `#${num}-${suffix}`
}

const register = async ({ phone_number, qdrant_id, confidence_score }) => {
  const { data: customer } = await supabase
    .from('customers')
    .select('id, first_name, last_name, phone')
    .eq('phone', phone_number)
    .maybeSingle()

  const callId = genCallId()

  const { data: call, error } = await supabase
    .from('calls')
    .insert({
      call_id: callId,
      customer_id: customer?.id || null,
      is_live: true,
      status: 'Active',
      start_time: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw new AppError(error.message || 'Failed to register call')

  scoreCache.set(callId, confidence_score ?? null)

  return {
    call_id: callId,
    qdrant_id: qdrant_id || null,
    phone_number,
    confidence_score: confidence_score ?? null,
    customer: customer
      ? { id: customer.id, name: `${customer.first_name} ${customer.last_name}` }
      : null,
  }
}

const getLive = async () => {
  const { data, error } = await supabase
    .from('calls')
    .select('*, customers(first_name, last_name, phone)')
    .eq('is_live', true)
    .order('start_time', { ascending: false })

  if (error) throw new AppError('Failed to fetch live calls')

  return data.map((call) => ({
    ...call,
    confidence_score: scoreCache.get(call.call_id) ?? null,
  }))
}

module.exports = { register, getLive }
