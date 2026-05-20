const authService = require('../services/authService')
const { success } = require('../utils/response')

const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body.email, req.body.password)
    success(res, data)
  } catch (err) {
    next(err)
  }
}

module.exports = { login }
