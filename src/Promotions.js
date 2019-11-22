'use strict'

module.exports = class Promotions {
  constructor (client, campaignsNamespace, promotionTiersNamespace) {
    this.client = client
    this.campaignsNamespace = campaignsNamespace

    // public
    this.tiers = promotionTiersNamespace
  }

  create (params, callback) {
    return this.campaignsNamespace.create(params, callback)
  }

  validate (params, callback) {
    return this.client.post('/promotions/validation', params, callback)
  }
}
