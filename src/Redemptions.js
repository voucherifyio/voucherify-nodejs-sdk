'use strict'

const {encode, isFunction, isObject, isString} = require('./helpers')

module.exports = class Redemptions {
  constructor (client, promotionsNamespace) {
    this.client = client
    this.promotions = promotionsNamespace
  }

  redeem (code, params, callback) {
    let context = {}
    let qs = {}
    let isDeprecated = false

    if (isObject(code) && isObject(params)) {
      return this.promotions.tiers.redeem(code['id'], params, callback)
    }

    if (isObject(code)) {
      isDeprecated = true
      console.warn('This redeem method invocation is deprecated. First argument should be always a code, check docs for more details. In next major update this method invocation will not be available.')
      if (isObject(params)) {
        console.warn('This redeem method invocation is deprecated. Params being an object will be ignored. In next major update this method invocation will not be available.')
      }

      context = code
      code = context.voucher
      delete context.voucher
    } else {
      context = params || {}
    }

    if (isFunction(params)) {
      callback = params
      context = isDeprecated ? context : null
    } else if (isString(params) && params.length > 0) {
      // FIXME put  to body: {customer: tracking_id}, test it with working API
      qs.tracking_id = encode(params)
    }

    return this.client.post(`/vouchers/${encode(code)}/redemption`, context, callback, {qs})
  }

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get('/redemptions', params, callback)
  }

  getForVoucher (code, callback) {
    return this.client.get(`/vouchers/${encode(code)}/redemption`, null, callback)
  }

  rollback (redemptionId, params, callback) {
    if (isFunction(params)) {
      callback = params
      params = null
    }

    let qs = {}
    let payload = {}

    if (isString(params)) {
      qs.reason = encode(params)
    } else if (isObject(params)) {
      const {reason, tracking_id, customer} = params

      qs = {
        reason: reason ? encode(reason) : undefined,
        tracking_id: tracking_id ? encode(tracking_id) : undefined // eslint-disable-line camelcase
      }
      payload = {customer}
    }

    return this.client.post(
      `/redemptions/${encode(redemptionId)}/rollback`,
      payload, callback, {qs}
    )
  }
}
