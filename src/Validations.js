'use strict'

const { encode, isFunction, isObject } = require('./helpers')

module.exports = class Validations {
  constructor (client, promotionsNamespace) {
    this.client = client
    this.promotions = promotionsNamespace
  }

  validateVoucher (code, params = {}, callback = null) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.post(`/vouchers/${encode(code)}/validate`, params, callback)
  }

  validate (code, context = {}, callback = null) {
    if (isObject(code)) {
      if (isFunction(context)) {
        callback = context
      }
      return this.promotions.validate(code, callback)
    }

    return this.validateVoucher(code, context, callback)
  }
}
