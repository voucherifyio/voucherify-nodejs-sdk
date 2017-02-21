/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('./client-loader')
const {reqWithBody} = require('./fixtures')
nock.disableNetConnect()

describe('Distributions API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  describe('publish voucher', function () {
    it('should publish by camaign name', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/publish')
        .query({campaign: 'test-campaign'})
        .reply(200, {})

      client.distributions.publish('test-campaign')
      .then(function () {
        server.done()
        done()
      })
    })

    it('should publish by voucher', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/publish', {
          campaign: 'test-campaign',
          voucher: 'test-voucher'
        })
        .reply(200, {})

      client.distributions.publish({
        campaign: 'test-campaign',
        voucher: 'test-voucher'
      })
      .then(function () {
        server.done()
        done()
      })
    })
  })
})
