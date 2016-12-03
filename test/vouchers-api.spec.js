/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('../src/index')
const {reqWithoutBody, reqWithBody} = require('./fixtures')
nock.disableNetConnect()

describe('Vouchers API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create voucher', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/vouchers/test-code', {
        code: 'test-code',
        type: 'DISCOUNT_VOUCHER'
      })
      .reply(200, {})

    client.vouchers.create({
      code: 'test-code',
      type: 'DISCOUNT_VOUCHER'
    })
    .then(() => {
      server.done()
      done()
    })
  })

  it('should get voucher', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/vouchers/test-code')
      .reply(200, {})

    client.vouchers.get('test-code')
      .then(() => {
        server.done()
        done()
      })
  })

  it('should update voucher', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/vouchers/test-code', {
        code: 'test-code',
        type: 'DISCOUNT_VOUCHER'
      })
      .reply(200, {})

    client.vouchers.update({
      code: 'test-code',
      type: 'DISCOUNT_VOUCHER'
    })
    .then(() => {
      server.done()
      done()
    })
  })

  describe('delete voucher', function () {
    it('should delete, but not permanently', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/vouchers/test-code')
        .query({force: false})
        .reply(200, {})

      client.vouchers.delete('test-code')
      .then(() => {
        server.done()
        done()
      })
    })

    it('should delete, but not permanently (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/vouchers/test-code')
        .query({force: false})
        .reply(200, {})

      client.vouchers.delete('test-code', (err) => {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should delete permanently', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/vouchers/test-code')
        .query({force: true})
        .reply(200, {})

      client.vouchers.delete('test-code', {force: true})
      .then(() => {
        server.done()
        done()
      })
    })
  })

  describe('list', function () {
    it('should list all vouchers', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/vouchers')
      .reply(200, [])

      client.vouchers.list()
      .then(() => {
        server.done()
        done()
      })
    })

    it('should list all vouchers (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/vouchers')
      .reply(200, [])

      client.vouchers.list((err) => {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should list vouchers by query', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/vouchers')
      .query({campaign: 'test-campaign'})
      .reply(200, [])

      client.vouchers.list({campaign: 'test-campaign'})
      .then(() => {
        server.done()
        done()
      })
    })
  })

  it('should enable voucher', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/vouchers/test-voucher/enable')
      .reply(200, {})

    client.vouchers.enable('test-voucher')
    .then(() => {
      server.done()
      done()
    })
  })

  it('should disable voucher', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/vouchers/test-voucher/disable')
      .reply(200, {})

    client.vouchers.disable('test-voucher')
    .then(() => {
      server.done()
      done()
    })
  })

  it('should import vouchers', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/vouchers/import', [
        {code: 'test-voucher1'},
        {code: 'test-voucher2'}
      ])
      .reply(200, {})

    client.vouchers.import([
      {code: 'test-voucher1'},
      {code: 'test-voucher2'}
    ])
    .then(() => {
      server.done()
      done()
    })
  })
})
