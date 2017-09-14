'use strict'

const {encode, isString, isObject, isFunction} = require('./helpers')

module.exports = class Distributions {
  constructor (client) {
    this.client = client

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
    if (isString(params)) {
      return this.client.post('/vouchers/publish', {campaign: encode(params)}, callback)
    }

    if (isObject(params)) {
      return this.client.post('/vouchers/publish', params, callback)
    }
  }
}
