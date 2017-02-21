/* eslint-env jasmine */
var nock = require('nock')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Validations API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  describe('validate voucher', function () {
    it('should validate without additional context', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test%20code/validate')
        .reply(200, {})

      client.validations.validateVoucher('test code')
      .then(function () {
        server.done()
        done()
      })
    })

    it('should validate without additional context (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test%20code/validate')
        .reply(200, {})

      client.validations.validateVoucher('test code', function (err) {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should validate with additional context', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test%20code/validate', {
          tracking_id: 'tracking-id'
        })
        .reply(200, {})

      client.validations.validateVoucher('test code', {
        tracking_id: 'tracking-id'
      })
      .then(function () {
        server.done()
        done()
      })
    })
  })
})
