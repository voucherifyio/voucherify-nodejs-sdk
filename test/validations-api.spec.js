/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('../src/index')
const {reqWithBody} = require('./fixtures')
nock.disableNetConnect()

describe('Validations API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  describe('validate voucher', function () {
    it('should validate without additional context', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test%20code/validate')
        .reply(200, {})

      client.validations.validateVoucher('test code')
      .then(() => {
        server.done()
        done()
      })
    })

    it('should validate without additional context (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test%20code/validate')
        .reply(200, {})

      client.validations.validateVoucher('test code', (err) => {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should validate with additional context', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test%20code/validate', {
          tracking_id: 'tracking-id'
        })
        .reply(200, {})

      client.validations.validateVoucher('test code', {
        tracking_id: 'tracking-id'
      })
      .then(() => {
        server.done()
        done()
      })
    })
  })
})
