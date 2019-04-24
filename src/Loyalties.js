'use strict'

const {encode, isFunction} = require('./helpers')
const omit = require('lodash.omit')

module.exports = class Loyalties {
  constructor (client) {
    this.client = client
  }

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get('/loyalties', params, callback)
  }

  create (campaign, callback) {
    return this.client.post('/loyalties', campaign, callback)
  }

  get (campaignId, callback) {
    return this.client.get(`/loyalties/${encode(campaignId)}`, null, callback)
  }

  update (campaign, callback) {
    return this.client.put(`/loyalties/${encode(campaign.id)}`, omit(campaign, ['id']), callback)
  }

  delete (campaignId, callback) {
    return this.client.delete(`/loyalties/${encode(campaignId)}`, callback)
  }

  listRewardAssignments (campaignId, params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get(`/loyalties/${encode(campaignId)}/rewards`, params, callback)
  }

  createRewardAssignments (campaignId, assignment, callback) {
    return this.client.post(`/loyalties/${encode(campaignId)}/rewards`, assignment, callback)
  }

  updateRewardAssignments (campaignId, assignment, callback) {
    return this.client.put(`/loyalties/${encode(campaignId)}/rewards/${assignment.id}`, omit(assignment, ['id']), callback)
  }

  deleteRewardAssignments (campaignId, assignmentId, callback) {
    return this.client.delete(`/loyalties/${encode(campaignId)}/rewards/${assignmentId}`, callback)
  }
}
