'use strict'

module.exports = class Consents {
  constructor (client) {
    this.client = client
  }

  list (callback) {
    return this.client.get(`/consents`, null, callback)
  }
}
