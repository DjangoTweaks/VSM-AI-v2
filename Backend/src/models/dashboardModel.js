const supabase = require('../config/supabase')

const getTotalCalls = () =>
  supabase.from('calls').select('id', { count: 'exact', head: true })

const getFlaggedCount = () =>
  supabase.from('flagged_calls').select('id', { count: 'exact', head: true })

const getPendingReviewCount = () =>
  supabase.from('flagged_calls').select('id', { count: 'exact', head: true }).eq('status', 'Pending Review')

const getRecentFlaggedCalls = () =>
  supabase.from('flagged_calls').select(`
    id,
    risk_level,
    risk_score,
    created_at,
    calls(call_id, customers(first_name, last_name))
  `).order('created_at', { ascending: false }).limit(10)

module.exports = { getTotalCalls, getFlaggedCount, getPendingReviewCount, getRecentFlaggedCalls }
