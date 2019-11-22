/* eslint-env jasmine */
var nock = require('nock')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Segments API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create segment', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/segments', {
        name: 'test-segment',
        type: 'auto-update',
        filter: {}
      })
      .reply(200, {})

    client.segments.create({
      name: 'test-segment',
      type: 'auto-update',
      filter: {}
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should get segment', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/segments/seg_test-id')
      .reply(200, {})

    client.segments.get('seg_test-id')
      .then(function () {
        server.done()
        done()
      })
  })

  it('should delete segment', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/segments/seg_test-id')
      .reply(200, {})

    client.segments.delete('seg_test-id')
      .then(function () {
        server.done()
        done()
      })
  })
})
