/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

var nock = require('nock')
var { expect } = require('chai')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody

nock.disableNetConnect()

describe('Consents API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  describe('list', function () {
    it('should list all consents', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/consents')
        .reply(200, [])

      client.consents.list()
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all consents (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/consents')
        .reply(200, [])

      client.consents.list(function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })
  })
})
