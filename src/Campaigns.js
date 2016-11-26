'use strict'

const {encode} = require('./helpers')

module.exports = class Campaigns {
  constructor (client) {
    this.client = client
  }

  create (campaign, callback) {
    return this.client.post('/campaigns', campaign, callback)
  }

  get (name, callback) {
    return this.client.get(`/campaigns/${encode(name)}`, null, callback)
  }

  addVoucher (campaignName, voucher, callback) {
    return this.client.post(
      `/campaigns/${encode(campaignName)}/vouchers`,
      // TODO if voucher is optional, secure against callback version
      voucher || {},
      callback
    )
  }

  importVouchers (campaignName, vouchers, callback) {
    return this.client.post(`/campaigns/${encode(campaignName)}/import`, vouchers, callback)
  }
}
