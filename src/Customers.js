'use strict'

const {encode} = require('./helpers')

module.exports = class Customers {
  create (customer, callback) {
    return this.client.post('/customers', customer, callback)
  }

  get (customerId, callback) {
    // TODO why fallback to empty string ?! shall we rather throw an error? print warning?
    return this.client.get(`/customers/${encode(customerId)}`, null, callback)
  }

  update (customer, callback) {
    return this.client.put(`/customers/${encode(customer.id)}`, customer, callback)
  }

  delete (customerId, callback) {
    return this.client.delete(`/customers/${encode(customerId)}`, callback)
  }
}
