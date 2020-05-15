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
    let startingAfter = params.starting_after
    let endingBefore = params.ending_before
    let direction = (startingAfter || !endingBefore) ? 'desc' : 'asc'

    let response = await this.client.get('/customers', Object.assign(
      {}, params, {
        starting_after: (startingAfter || endingBefore) ? startingAfter : '1970-01-01T00:00:00Z',
        ending_before: endingBefore
      }
    ))

    while (true) {
      if (response.customers.length === 0) {
        break;
      }
      for (const customer of response.customers) {
        // comparing ISOs
        if (direction === 'asc') {
          endingBefore = endingBefore < customer.created_at ? endingBefore : customer.created_at
        } else {
          startingAfter = startingAfter > customer.created_at ? startingAfter : customer.created_at
        }
        yield customer
      }
      if (!response.has_more) {
        break;
      }

      response = await this.client.get(
        '/customers',
        Object.assign({}, params, {
          ending_before: endingBefore,
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
