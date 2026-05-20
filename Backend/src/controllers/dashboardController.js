const dashboardService = require('../services/dashboardService')
const { success } = require('../utils/response')

const getStats = async (req, res, next) => {
  try {
    const data = await dashboardService.getStats()
    success(res, data)
  } catch (err) {
    next(err)
  }
}

const getFlaggedCalls = async (req, res, next) => {
  try {
    const data = await dashboardService.getRecentFlaggedCalls()
    success(res, data)
  } catch (err) {
    next(err)
  }
}

module.exports = { getStats, getFlaggedCalls }
