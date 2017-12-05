'use strict'

const {encode} = require('./helpers')
const omit = require('lodash.omit')

module.exports = class Customers {
  constructor (client) {
    this.client = client
  }

  create (customer, callback) {
    return this.client.post('/customers', customer, callback)
  }

  get (customerId, callback) {
    return this.client.get(`/customers/${encode(customerId)}`, null, callback)
  }

  update (customer, callback) {
    return this.client.put(`/customers/${encode(customer.id || customer.source_id)}`, omit(customer, ['id']), callback)
  }

  delete (customerId, callback) {
    return this.client.delete(`/customers/${encode(customerId)}`, callback)
  }
}
