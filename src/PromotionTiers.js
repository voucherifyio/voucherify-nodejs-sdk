'use strict'

const { encode } = require('./helpers')

module.exports = class PromotionTiers {
  constructor (client) {
    this.client = client
  }

  listAll (params = {}, callback) {
    return this.client.get('/promotions/tiers', params, callback)
  }

  list (promotionId, callback) {
    return this.client.get(`/promotions/${encode(promotionId)}/tiers`, null, callback)
  }

  create (promotionId, params, callback) {
    return this.client.post(`/promotions/${encode(promotionId)}/tiers`, params, callback)
  }

  redeem (promotionsTierId, params, callback) {
    return this.client.post(`/promotions/tiers/${encode(promotionsTierId)}/redemption`, params, callback)
  }

  update (params = {}, callback = {}) {
    return this.client.put(`/promotions/tiers/${encode(params.id)}`, params, callback)
  }

  delete (promotionsTierId, callback) {
    return this.client.delete(`/promotions/tiers/${encode(promotionsTierId)}`, null, callback)
  }
}
