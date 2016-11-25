'use strict'

const {encode, isFunction, isString, isObject} = require('./helpers')

module.exports = class Vouchers {
  constructor (client) {
    this.client = client
  }

  create (voucher, callback) {
    return this.client.post(`/vouchers/${encode(voucher.code)}`, voucher, callback)
  }

  get (code, callback) {
    return this.client.get(`/vouchers/${encode(code)}`, null, callback)
  }

  update (voucher, callback) {
    return this.client.put(`/vouchers/${encode(voucher.code)}`, voucher, callback)
  }

  delete (voucherCode, params = {}, callback = null) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    let path = `/vouchers/${encode(voucherCode)}`
    if (params.force) {
      path += '?force=true'
    }

    return this.client.delete(path, callback)
  }

  list (query, callback) {
    return this.client.get('/vouchers/', query, callback)
  }

  publish (campaignName, callback) {
    let qs = {}
    let payload = {}

    if (isString(campaignName)) {
      qs.campaign = encode(campaignName)
    }
    if (isObject(campaignName)) {
      payload = campaignName
    }

    return this.client.post('/vouchers/publish', payload, callback, {qs})
  }

  enable (code, callback) {
    return this.client.post(`/vouchers/${encode(code)}/enable`, null, callback)
  }

  disable (code, callback) {
    return this.client.post(`/vouchers/${encode(code)}/disable`, null, callback)
  }

  // TODO implement
  ipmort () {}
}
