/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const nock = require('nock')
const { expect } = require('chai')
const VoucherifyClient = require('./client-loader')
const fixtures = require('./fixtures')
const reqWithoutBody = fixtures.reqWithoutBody

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
