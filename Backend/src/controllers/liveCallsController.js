const liveCallService = require('../services/liveCallService')
const { success } = require('../utils/response')

const register = async (req, res, next) => {
  const { phone_number, qdrant_id, confidence_score } = req.body
  console.log(`[POST /live-calls] phone=${phone_number} qdrant_id=${qdrant_id} score=${confidence_score}`)
  try {
    const data = await liveCallService.register({ phone_number, qdrant_id, confidence_score })
    console.log(`[POST /live-calls] registered call_id=${data.call_id} customer=${data.customer?.name ?? 'unknown'}`)
    success(res, data, 201)
  } catch (err) {
    console.error(`[POST /live-calls] error: ${err.message}`)
    next(err)
  }
}

const getLive = async (req, res, next) => {
  console.log('[GET /live-calls] fetching active calls')
  try {
    const data = await liveCallService.getLive()
    console.log(`[GET /live-calls] returned ${data.length} call(s)`)
    success(res, data)
  } catch (err) {
    console.error(`[GET /live-calls] error: ${err.message}`)
    next(err)
  }
}

module.exports = { register, getLive }
