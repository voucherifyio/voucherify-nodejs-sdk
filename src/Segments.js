'use strict'

const {encode} = require('./helpers')

module.exports = class Segments {
  constructor (client) {
    this.client = client
  }

  create (segment, callback) {
    return this.client.post('/segments', segment, callback)
  }

  get (segmentId, callback) {
    return this.client.get(`/segments/${encode(segmentId)}`, null, callback)
  }

  delete (segmentId, callback) {
    return this.client.delete(`/segments/${encode(segmentId)}`, callback)
  }
}
