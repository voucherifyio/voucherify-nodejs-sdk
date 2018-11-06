'use strict'

const {encode, isFunction} = require('./helpers')
const omit = require('lodash.omit')

module.exports = class Orders {
  constructor (client) {
    this.client = client
  }

  create (order, callback) {
    return this.client.post('/orders', order, callback)
  }

  get (orderId, callback) {
    return this.client.get(`/orders/${encode(orderId)}`, null, callback)
  }

  update (order, callback) {
    return this.client.put(`/orders/${encode(order.id || order.source_id)}`, omit(order, ['id']), callback)
  }

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }
    return this.client.get('/orders', params, callback)
  }
}
