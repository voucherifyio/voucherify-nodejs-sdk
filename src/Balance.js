'use strict'

const {encode} = require('./helpers')

module.exports = class Balance {
  constructor (client) {
    this.client = client
  }

  create (voucher, callback) {
    return this.client.post(`/vouchers/${encode(voucher.code)}/balance`, voucher, callback)
  }
}
