'use strict'

const { encode, isFunction } = require('./helpers')
const omit = require('lodash/omit')

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

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get('/customers', params, callback)
  }

  async * scroll (params = {}) {
    let startingAfter = params.starting_after || (params.order === 'created_at' ? '1970-01-01T00:00:00Z' : '2200-01-01T00:00:00Z')
    let response = await this.client.get('/customers', Object.assign(
      {}, params, { starting_after: startingAfter }
    ))

    while (true) {
      if (response.customers.length === 0) {
        break
      }
      for (const customer of response.customers) {
        if (params.order === 'created_at') { // ascending
          startingAfter = startingAfter > customer.created_at ? startingAfter : customer.created_at
        } else {
          // default order descending: -created_at
          startingAfter = startingAfter < customer.created_at ? startingAfter : customer.created_at
        }
        yield customer
      }
      if (!response.has_more) {
        break
      }

      response = await this.client.get(
        '/customers',
        Object.assign({}, params, {
          starting_after: startingAfter
        })
      )
    }
  }

  update (customer, callback) {
    return this.client.put(`/customers/${encode(customer.id || customer.source_id)}`, omit(customer, ['id']), callback)
  }

  delete (customerId, callback) {
    return this.client.delete(`/customers/${encode(customerId)}`, callback)
  }

  updateConsents (customer, consents, callback) {
    return this.client.put(`/customers/${encode(customer.id || customer.source_id)}/consents`, consents, callback)
  }
}
