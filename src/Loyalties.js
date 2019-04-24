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
}
