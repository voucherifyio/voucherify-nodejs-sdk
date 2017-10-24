'use strict'

const {isFunction} = require('./helpers')

module.exports = class Events {
  constructor (client) {
    this.client = client
  }

  track (eventName, metadata, customer, callback) {
    if (isFunction(customer)) {
      callback = customer
      customer = {}
    }

    return this.client.post(`/events`, {
      event: eventName,
      customer,
      metadata
    }, callback)
  }
}
