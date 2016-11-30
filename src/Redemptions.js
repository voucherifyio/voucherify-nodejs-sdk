'use strict'

const {encode, isFunction, isObject, isString} = require('./helpers')

module.exports = class Redemptions {
  constructor (client) {
    this.client = client
  }

  redeem (code, params, callback) {
    let context = {}
    let qs = {}
    let isDeprecated = false
    if (isObject(code)) {
      isDeprecated = true
      console.warn('This redeem method invocation is deprecated. First argument should be always a code, check docs for more details.')
      if (isObject(params)) {
        console.warn('This redeem method invocation is deprecated. Params being an object will be ingored.')
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

  list (query, callback) {
    if (isFunction(query)) {
      callback = query
      query = null
    }

    return this.client.get('/redemptions', query, callback)
  }

  getForVoucher (code, callback) {
    return this.client.get(`/vouchers/${encode(code)}/redemption`, null, callback)
  }

  rollback (redemptionId, data, callback) {
    if (isFunction(data)) {
      callback = data
      data = null
    }

    let qs = {}
    let payload = {}

    if (isString(data)) {
      qs.reason = encode(data)
    } else if (isObject(data)) {
      const {reason, tracking_id, customer} = data

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
