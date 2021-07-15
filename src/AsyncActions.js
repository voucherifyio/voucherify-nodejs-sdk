'use strict'

const { encode, isFunction } = require('./helpers')

module.exports = class AsyncActions {
  constructor (client) {
    this.client = client
  }

  get (id, callback) {
    return this.client.get(`/async-actions/${encode(id)}`, null, callback)
  }

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }
    return this.client.get('/async-actions', params, callback)
  }
}
