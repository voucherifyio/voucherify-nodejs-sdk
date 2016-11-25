'use strict'

const {encode} = require('./helpers')

module.exports = class Campaigns {
  constructor (client) {
    this.client = client
  }

  addVoucher (campaignName, voucher, callback) {
    return this.client.post(
      `/campaigns/${encode(campaignName)}/vouchers`,
      // TODO if voucher is optional, secure against callback version
      voucher || {},
      callback
    )
  }
}
