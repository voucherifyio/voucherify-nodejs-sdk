/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

var nock = require('nock')
var { expect } = require('chai')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody

nock.disableNetConnect()

describe('AsyncActions API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should get async action', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/async-actions/aa_import_vouchers')
      .reply(200, {})

    client.asyncActions.get('aa_import_vouchers')
      .then(function () {
        server.done()
        done()
      })
  })

  describe('list', function () {
    it('should list all async actions', function (done) {
        var server = nock('https://api.voucherify.io', reqWithoutBody)
          .get('/v1/async-actions')
          .reply(200, [])
    
        client.asyncActions.list()
          .then(function () {
            server.done()
            done()
          })
      })

    it('should list all async actions (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/async-actions')
        .reply(200, [])

      client.asyncActions.list(function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should list async-actions with params', function (done) {
        var server = nock('https://api.voucherify.io', reqWithoutBody)
          .get('/v1/async-actions')
          .query({ limit: 5, end_date: '2021-07-15T10:00:00.000Z' })
          .reply(200, [])

        client.asyncActions.list({ limit: 5, end_date: '2021-07-15T10:00:00.000Z' })
          .then(function () {
            server.done()
            done()
          })
      })
  })
})
