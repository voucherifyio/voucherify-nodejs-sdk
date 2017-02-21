/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('./client-loader')
const {reqWithoutBody, reqWithBody} = require('./fixtures')
nock.disableNetConnect()

describe('Campaigns API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create campaign', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/campaigns', {
        name: 'test campaign'
      })
      .reply(200, {})

    client.campaigns.create({
      name: 'test campaign'
    })
    .then(function () {
      server.done()
      done()
    })
  })

  it('should get camaign', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/campaigns/test%20campaign')
      .reply(200, {})

    client.campaigns.get('test campaign')
      .then(function () {
        server.done()
        done()
      })
  })

  describe('add voucher', function () {
    it('should add voucher with concrete code', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/campaigns/test%20campaign/vouchers', {code: 'test voucher'})
      .reply(200, {})

      client.campaigns.addVoucher('test campaign', {code: 'test voucher'})
      .then(function () {
        server.done()
        done()
      })
    })

    it('should add voucher without params', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/campaigns/test%20campaign/vouchers', {})
      .reply(200, {})

      client.campaigns.addVoucher('test campaign')
      .then(function () {
        server.done()
        done()
      })
    })

    it('should add voucher without params (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/campaigns/test%20campaign/vouchers', {})
      .reply(200, {})

      client.campaigns.addVoucher('test campaign', function (err) {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })
  })

  it('should import vouchers', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/campaigns/test%20campaign/import', [{
        code: 'test voucher'
      }])
      .reply(200, {})

    client.campaigns.importVouchers('test campaign', [{
      code: 'test voucher'
    }])
    .then(function () {
      server.done()
      done()
    })
  })
})
