'use strict'

const {encode, isString, isObject, isFunction} = require('./helpers')

module.exports = class Distributions {
  constructor (client) {
    this.client = client
  }

  publish (params, callback) {
    if (isString(params)) {
      return this.client.post('/vouchers/publish', {campaign: encode(params)}, callback)
    }

    if (isObject(params)) {
      return this.client.post('/vouchers/publish', params, callback)
    }
  }

  listPublications (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get('/publications', params, callback)
  }
}
