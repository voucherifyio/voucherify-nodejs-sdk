/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('../src/index')
const {
  validateCallbackResult,
  validateResolvedPromise
} = require('./utils')
nock.disableNetConnect()

describe('Vouchers API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  describe('get voucher', function () {
    let server
    beforeEach(function () {
      server = nock('https://api.voucherify.io')
        .get('/v1/vouchers/test-code')
        .reply(200, {})
    })

    it('should execute request (callback)', function (done) {
      client.vouchers.get('test-code', validateCallbackResult(done, server))
    })

    it('should execute request', function (done) {
      client.vouchers.get('test-code')
        .then(validateResolvedPromise(done, server))
    })

    it('should execute request (deprected method)', function (done) {
      client.get('test-code')
        .then(validateResolvedPromise(done, server))
    })
  })
})
