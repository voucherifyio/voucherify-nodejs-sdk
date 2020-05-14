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
    let response = await this.client.get('/customers', Object.assign({}, params, {scroll: true}))
    let createdAfter = params.created_after
    let createdBefore = params.created_before
    let direction = (createdAfter || !createdBefore) ? 'desc' : 'asc'

    while (true) {
      if (response.customers.length === 0) {
        break;
      }
      for (const customer of response.customers) {
        // comparing ISOs
        if (direction === 'asc') {
          createdBefore = createdBefore < customer.created_at ? createdBefore : customer.created_at
        } else {
          createdAfter = createdAfter > customer.created_at ? createdAfter : customer.created_at
        }
        yield customer
      }
      if (!response.has_more) {
        break;
      }

      response = await this.client.get(
        '/customers',
        Object.assign({}, params, {
          scroll: true,
          created_before: createdBefore,
          created_after: createdAfter
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
