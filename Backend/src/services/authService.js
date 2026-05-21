const { UnauthorizedError } = require('../utils/errors')

const login = (email, password) => {
  if (email !== process.env.DEMO_USERNAME || password !== process.env.DEMO_PASSWORD) {
    throw new UnauthorizedError('Invalid credentials')
  }
  return { token: 'vsm-demo-session', user: { email, role: 'Manager' } }
}

module.exports = { login }
