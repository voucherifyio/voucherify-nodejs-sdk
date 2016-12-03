'use strict'

const {encode, isString, isObject} = require('./helpers')

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
}
