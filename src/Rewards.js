'use strict'

const {encode, isFunction} = require('./helpers')
const omit = require('lodash.omit')

module.exports = class Rewards {
  constructor (client) {
    this.client = client
  }

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get('/rewards', params, callback)
  }

  create (reward, callback) {
    return this.client.post('/rewards', reward, callback)
  }

  get (rewardId, callback) {
    return this.client.get(`/rewards/${encode(rewardId)}`, callback)
  }

  update (reward, callback) {
    return this.client.put(`/rewards/${encode(reward.id)}`, omit(reward, ['id']), callback)
  }

  delete (rewardId, callback) {
    return this.client.delete(`/rewards/${encode(rewardId)}`, callback)
  }
}
