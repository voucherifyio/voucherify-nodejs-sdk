'use strict'

const { encode, isFunction } = require('./helpers')

module.exports = class Campaigns {
  constructor (client) {
    this.client = client
  }

  create (campaign, callback) {
    return this.client.post('/campaigns', campaign, callback)
  }

  update (nameOrId, campaign, callback) {
    return this.client.put(`/campaigns/${encode(nameOrId)}`, campaign, callback)
  }

  get (name, callback) {
    return this.client.get(`/campaigns/${encode(name)}`, null, callback)
  }

  delete (name, params = {}, callback = null) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.delete(`/campaigns/${encode(name)}`, callback, {
      qs: { force: !!params.force }
    })
  }

  addVoucher (campaignName, params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.post(
      `/campaigns/${encode(campaignName)}/vouchers`,
      params || {},
      callback
    )
  }

  importVouchers (campaignName, vouchers, callback) {
    return this.client.post(`/campaigns/${encode(campaignName)}/import`, vouchers, callback)
  }

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get('/campaigns', params, callback)
  }
}
