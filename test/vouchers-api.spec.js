/* eslint-env jasmine */
var nock = require('nock')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Vouchers API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create voucher', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/vouchers/test-code', {
        code: 'test-code',
        type: 'DISCOUNT_VOUCHER'
      })
      .reply(200, {})

    client.vouchers.create({
      code: 'test-code',
      type: 'DISCOUNT_VOUCHER'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should get voucher', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/vouchers/test-code')
      .reply(200, {})

    client.vouchers.get('test-code')
      .then(function () {
        server.done()
        done()
      })
  })

  it('should update voucher', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/vouchers/test-code', {
        code: 'test-code',
        type: 'DISCOUNT_VOUCHER'
      })
      .reply(200, {})

    client.vouchers.update({
      code: 'test-code',
      type: 'DISCOUNT_VOUCHER'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  describe('delete voucher', function () {
    it('should delete, but not permanently', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/vouchers/test-code')
        .query({ force: false })
        .reply(200, {})

      client.vouchers.delete('test-code')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should delete, but not permanently (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/vouchers/test-code')
        .query({ force: false })
        .reply(200, {})

      client.vouchers.delete('test-code', function (err) {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should delete permanently', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/vouchers/test-code')
        .query({ force: true })
        .reply(200, {})

      client.vouchers.delete('test-code', { force: true })
        .then(function () {
          server.done()
          done()
        })
    })
  })

  it('should add gift voucher balance', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/vouchers/test-code/balance', {
        amount: 2000
      })
      .reply(200, {})

    client.vouchers.balance.create('test-code', {
      amount: 2000
    })
      .then(function () {
        server.done()
        done()
      })
  })

  describe('list', function () {
    it('should list all vouchers', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/vouchers')
        .reply(200, [])

      client.vouchers.list()
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all vouchers (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/vouchers')
        .reply(200, [])

      client.vouchers.list(function (err) {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should list vouchers by query', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/vouchers')
        .query({ campaign: 'test-campaign' })
        .reply(200, [])

      client.vouchers.list({ campaign: 'test-campaign' })
        .then(function () {
          server.done()
          done()
        })
    })
  })

  describe('enable', function () {
    it('should enable by voucher code', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test-voucher/enable')
        .reply(200, {})

      client.vouchers.enable('test-voucher')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should run bulk enable by params', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/enable')
        .reply(200, {})

      client.vouchers.enable({
        vouchers: ['code1', 'code2']
      })
        .then(function () {
          server.done()
          done()
        })
    })
  })

  describe('disable', function () {
    it('should disable by voucher code', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test-voucher/disable')
        .reply(200, {})

      client.vouchers.disable('test-voucher')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should run bulk disable by params', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/disable')
        .reply(200, {})

      client.vouchers.disable({
        vouchers: ['code1', 'code2']
      })
        .then(function () {
          server.done()
          done()
        })
    })
  })

  it('should import vouchers', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/vouchers/import', [
        { code: 'test-voucher1' },
        { code: 'test-voucher2' }
      ])
      .reply(200, {})

    client.vouchers.import([
      { code: 'test-voucher1' },
      { code: 'test-voucher2' }
    ])
      .then(function () {
        server.done()
        done()
      })
  })
})
