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

  updateRewardAssignment (campaignId, assignment, callback) {
    return this.client.put(`/loyalties/${encode(campaignId)}/rewards/${assignment.id}`, omit(assignment, ['id']), callback)
  }

  deleteRewardAssignment (campaignId, assignmentId, callback) {
    return this.client.delete(`/loyalties/${encode(campaignId)}/rewards/${assignmentId}`, callback)
  }

  listEarningRules (campaignId, params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get(`/loyalties/${encode(campaignId)}/earning-rules`, params, callback)
  }

  createEarningRules (campaignId, earningRules, callback) {
    return this.client.post(`/loyalties/${encode(campaignId)}/earning-rules`, earningRules, callback)
  }

  updateEarningRules (campaignId, earningRule, callback) {
    return this.client.put(`/loyalties/${encode(campaignId)}/earning-rules/${earningRule.id}`, omit(earningRule, ['id']), callback)
  }

  deleteEarningRules (campaignId, earningRuleId, callback) {
    return this.client.delete(`/loyalties/${encode(campaignId)}/earning-rules/${earningRuleId}`, callback)
  }

  listMembers (campaignId, params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get(`/loyalties/${encode(campaignId)}/members`, params, callback)
  }

  createMember (campaignId, member, callback) {
    return this.client.post(`/loyalties/${encode(campaignId)}/members`, member, callback)
  }

  getMember (campaignId, memberId, callback) {
    return this.client.get(`/loyalties/${encode(campaignId)}/members/${memberId}`, null, callback)
  }

  addPoints (campaignId, memberId, balance, callback) {
    return this.client.post(`/loyalties/${encode(campaignId)}/members/${memberId}/balance`, balance, callback)
  }

  redeemReward (campaignId, memberId, reward, callback) {
    return this.client.post(`/loyalties/${encode(campaignId)}/members/${memberId}/redemption`, reward, callback)
  }
}
