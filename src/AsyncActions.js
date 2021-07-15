'use strict'

const { encode } = require('./helpers')

module.exports = class AsyncActions {
  constructor (client) {
    this.client = client
  }

  get (id, callback) {
    return this.client.get(`/async-actions/${encode(id)}`, null, callback)
  }

  list (callback) {
    return this.client.get('/async-actions', null, callback)
  }
}
