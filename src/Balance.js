'use strict'

const {encode} = require('./helpers')

module.exports = class Balance {
  constructor (client) {
    this.client = client
  }

  create (code, params, callback) {
    return this.client.post(`/vouchers/${encode(code)}/balance`, params, callback)
  }
}
