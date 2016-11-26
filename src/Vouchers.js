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

    return this.client.delete(`/vouchers/${encode(voucherCode)}`, callback, {
      qs: {force: !!params.force}
    })
  }

  list (query, callback) {
    return this.client.get('/vouchers/', query, callback)
  }

  publish (campaignName, callback) {
    if (isString(campaignName)) {
      return this.client.post('/vouchers/publish', null, callback, {
        qs: {campaign: encode(campaignName)}
      })
    }

    if (isObject(campaignName)) {
      return this.client.post('/vouchers/publish', campaignName, callback)
    }
  }

  enable (code, callback) {
    return this.client.post(`/vouchers/${encode(code)}/enable`, null, callback)
  }

  disable (code, callback) {
    return this.client.post(`/vouchers/${encode(code)}/disable`, null, callback)
  }

  import (vouchers, callback) {
    return this.client.post(`/vouchers/import`, vouchers, callback)
  }
}