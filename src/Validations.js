'use strict'

const {encode, isFunction} = require('./helpers')

module.exports = class Validations {
  constructor (client) {
    this.client = client
  }

  validateVoucher (code, params = {}, callback = null) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.post(`/vouchers/${encode(code)}/validate`, params, callback)
  }
}
