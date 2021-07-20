'use strict'

const { encode } = require('./helpers')

module.exports = class Skus {
  constructor (client) {
    this.client = client
  }

  get (skuId, callback) {
    return this.client.get(`/skus/${encode(skuId)}`, null, callback)
  }
}
