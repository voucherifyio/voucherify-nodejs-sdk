'use strict'

const {encode, isFunction} = require('./helpers')

module.exports = class Validations {
  constructor (client) {
    this.client = client
  }

  validateVoucher (code, context = {}, callback = null) {
    if (isFunction(context)) {
      callback = context
      context = {}
    }

    return this.client.post(`/vouchers/${encode(code)}/validate`, context, callback)
  }
}
