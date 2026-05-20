const dashboardModel = require('../models/dashboardModel')
const { AppError } = require('../utils/errors')

const getStats = async () => {
  const [totalResult, flaggedResult, pendingResult] = await Promise.all([
    dashboardModel.getTotalCalls(),
    dashboardModel.getFlaggedCount(),
    dashboardModel.getPendingReviewCount(),
  ])

  if (totalResult.error) throw new AppError('Failed to fetch dashboard stats')

  return {
    totalCalls: totalResult.count ?? 0,
    flaggedCalls: flaggedResult.count ?? 0,
    reviewsPending: pendingResult.count ?? 0,
  }
}

const getRecentFlaggedCalls = async () => {
  const { data, error } = await dashboardModel.getRecentFlaggedCalls()
  if (error) throw new AppError('Failed to fetch flagged calls')
  return data
}

module.exports = { getStats, getRecentFlaggedCalls }
