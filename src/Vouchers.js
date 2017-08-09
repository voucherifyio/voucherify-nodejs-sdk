'use strict'

const {encode, isFunction, isObject} = require('./helpers')

module.exports = class Vouchers {
  constructor (client, balance) {
    this.client = client

    // public
    this.balance = balance
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

  delete (code, params = {}, callback = null) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.delete(`/vouchers/${encode(code)}`, callback, {
      qs: {force: !!params.force}
    })
  }

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get('/vouchers', params, callback)
  }

  enable (params, callback) {
    if (isObject(params)) {
      return this.client.post(`/vouchers/enable`, params, callback)
    }

    // Enable by code
    return this.client.post(`/vouchers/${encode(params)}/enable`, null, callback)
  }

  disable (params, callback) {
    if (isObject(params)) {
      return this.client.post(`/vouchers/disable`, params, callback)
    }

    // Disable by code
    return this.client.post(`/vouchers/${encode(params)}/disable`, null, callback)
  }

  import (vouchers, callback) {
    return this.client.post(`/vouchers/import`, vouchers, callback)
  }
}
