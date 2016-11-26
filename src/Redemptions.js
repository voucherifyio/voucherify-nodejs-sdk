'use strict'

const {encode, isFunction, isObject, isString} = require('./helpers')

module.exports = class Redemptions {
  constructor (client) {
    this.client = client
  }

  redeem (code, trackingId, callback) {
    let context = {}
    if (isObject(code)) {
      context = code
      code = context.voucher
      delete context.voucher
    }
    if (isFunction(trackingId)) {
      callback = trackingId
      trackingId = null
    }

    let url = `/vouchers/${encode(code)}/redemption`

    if (isString(trackingId) && trackingId) {
      url += `?tracking_id=${encode(trackingId)}`
    }

    return this.client.post(url, context, callback)
  }

  /*
  *  List redemptions. Sample query (1000 successful redemptions from April 2016):
  *  {
  *      limit: 1000,
  *      page: 0,
  *      start_date: '2016-04-01T00:00:00',
  *      end_date: '2016-04-30T23:59:59',
  *      result: 'Success'
  *  }
  */
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

    // If `reason` passed, use it in query string.
    if (isString(data)) {
      qs.reason = encode(data)
    }

    if (isObject(data)) {
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
