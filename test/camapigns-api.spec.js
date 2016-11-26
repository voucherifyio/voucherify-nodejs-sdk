/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('../src/index')
const {reqheaders} = require('./fixtures')
nock.disableNetConnect()

describe('Campaigns API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create campaign', function (done) {
    const server = nock('https://api.voucherify.io', {reqheaders})
      .post('/v1/campaigns', {
        name: 'test campaign'
      })
      .reply(200, {})

    client.campaigns.create({
      name: 'test campaign'
    })
    .then(() => {
      server.done()
      done()
    })
  })

  it('should get camaign', function (done) {
    const server = nock('https://api.voucherify.io', {reqheaders})
      .get('/v1/campaigns/test%20campaign')
      .reply(200, {})

    client.campaigns.get('test campaign')
      .then(() => {
        server.done()
        done()
      })
  })

  it('should add voucher', function (done) {
    const server = nock('https://api.voucherify.io', {reqheaders})
      .post('/v1/campaigns/test%20campaign/vouchers', {
        code: 'test voucher'
      })
      .reply(200, {})

    client.campaigns.addVoucher('test campaign', {
      code: 'test voucher'
    })
    .then(() => {
      server.done()
      done()
    })
  })

  it('should add voucher', function (done) {
    const server = nock('https://api.voucherify.io', {reqheaders})
      .post('/v1/campaigns/test%20campaign/import', [{
        code: 'test voucher'
      }])
      .reply(200, {})

    client.campaigns.importVouchers('test campaign', [{
      code: 'test voucher'
    }])
    .then(() => {
      server.done()
      done()
    })
  })
})
