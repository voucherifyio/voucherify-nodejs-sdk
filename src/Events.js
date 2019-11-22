'use strict'

const { isObject } = require('./helpers')

module.exports = class Events {
  constructor (client) {
    this.client = client
  }

  create (eventName, params, callback) {
    if (!isObject(params)) {
      params = {}
    }
    params.event = eventName
    return this.client.post('/events', params, callback)
  }
}
