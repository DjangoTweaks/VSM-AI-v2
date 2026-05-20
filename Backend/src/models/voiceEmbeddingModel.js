const supabase = require('../config/supabase')

const findByCustomer = (customerId) =>
  supabase.from('voice_embeddings').select('*').eq('customer_id', customerId).order('created_at', { ascending: false })

const findById = (id) =>
  supabase.from('voice_embeddings').select('*').eq('id', id).single()

const create = (data) =>
  supabase.from('voice_embeddings').insert(data).select().single()

const uploadFile = async (bucket, path, buffer, mimeType) => {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, { contentType: mimeType, upsert: false })
  if (error) throw error

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

module.exports = { findByCustomer, findById, create, uploadFile }
