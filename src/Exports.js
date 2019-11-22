'use strict'

const { encode } = require('./helpers')

module.exports = class Exports {
  constructor (client) {
    this.client = client
  }

  create (exportResource, callback) {
    return this.client.post('/exports', exportResource, callback)
  }

  get (exportResourceId, callback) {
    return this.client.get(`/exports/${encode(exportResourceId)}`, null, callback)
  }

  delete (exportResourceId, callback) {
    return this.client.delete(`/exports/${encode(exportResourceId)}`, callback)
  }
}
