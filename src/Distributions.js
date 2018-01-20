'use strict'

const {encode, isFunction} = require('./helpers')

module.exports = class Distributions {
  constructor (client, exportsNamespace) {
    this.client = client
    this.exports = exportsNamespace
    this.publications = {
      list (params, callback) {
        if (isFunction(params)) {
          callback = params
          params = {}
        }

        return client.get('/publications', params, callback)
      }
    }
  }

  publish (params, callback) {
    return this.client.post('/vouchers/publish', params, callback)
  }
}
