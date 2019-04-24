'use strict'

const {isFunction} = require('./helpers')

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
}
