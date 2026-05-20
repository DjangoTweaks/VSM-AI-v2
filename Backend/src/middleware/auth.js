const supabase = require('../config/supabase')
const { UnauthorizedError } = require('../utils/errors')

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) throw new UnauthorizedError('No token provided')

    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) throw new UnauthorizedError('Invalid or expired token')

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

const requireRole = (roles) => async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', req.user.id)
      .single()

    if (error || !data) throw new UnauthorizedError()
    if (!roles.includes(data.role)) throw new UnauthorizedError('Insufficient permissions')

    req.userRole = data.role
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { requireAuth, requireRole }
