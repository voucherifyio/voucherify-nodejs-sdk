/* eslint-env jasmine */
var nock = require('nock')
var { expect } = require('chai')
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
        expect(err).to.be.null
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

    it('should validate using alias', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test%20code/validate')
        .reply(200, {})

      client.validations.validate('test code', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should validate using alias (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test%20code/validate')
        .reply(200, {})

      client.validations.validate('test code')
        .then(function () {
          server.done()
          done()
        })
    })
  })

  describe('validate promotion', function () {
    it('should validate tier', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/promotions/validation', {
          order: {
            amount: 25000
          }
        })
        .reply(200, {})

      client.validations.validate({
        order: {
          amount: 25000
        }
      }).then(function () {
        server.done()
        done()
      })
    })

    it('should validate tier (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/promotions/validation')
        .reply(200, {})

      client.validations.validate({
        order: {
          amount: 25000
        }
      }, function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })
  })
})
