/* eslint-env jasmine */
var nock = require('nock')
var { expect } = require('chai')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody

nock.disableNetConnect()

describe('Campaigns API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create campaign', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
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

  it('should update campaign', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/campaigns/cust_ABCD', {
        description: 'test campaign'
      })
      .reply(200, {})

    client.campaigns.update('cust_ABCD', {
      description: 'test campaign'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  describe('delete campaign', function () {
    it('should delete, but not permanently', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/campaigns/test-campaign')
        .query({ force: false })
        .reply(200, {})

      client.campaigns.delete('test-campaign')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should delete, but not permanently (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/campaigns/test-campaign')
        .query({ force: false })
        .reply(200, {})

      client.campaigns.delete('test-campaign', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should delete permanently', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/campaigns/test-campaign')
        .query({ force: true })
        .reply(200, {})

      client.campaigns.delete('test-campaign', { force: true })
        .then(function () {
          server.done()
          done()
        })
    })
  })

  it('should get camaign', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
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
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/campaigns/test%20campaign/vouchers', { code: 'test voucher' })
        .reply(200, {})

      client.campaigns.addVoucher('test campaign', { code: 'test voucher' })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should add voucher without params', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/campaigns/test%20campaign/vouchers', {})
        .reply(200, {})

      client.campaigns.addVoucher('test campaign')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should add voucher without params (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/campaigns/test%20campaign/vouchers', {})
        .reply(200, {})

      client.campaigns.addVoucher('test campaign', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })
  })

  it('should import vouchers', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
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

  describe('list', function () {
    it('should list all campaigns', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/campaigns')
        .reply(200, [])

      client.campaigns.list()
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all campaigns (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/campaigns')
        .reply(200, [])

      client.campaigns.list(function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })
  })

  describe('qualified campaigns', function () {
    it('should get audience rules only', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/campaigns/qualification?audienceRulesOnly=true', {
          metadata: { test: true }
        })
        .reply(200, {})

      client.campaigns.qualifications.examine({ metadata: { test: true } }, { audienceRulesOnly: true })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should get matched campaigns', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/campaigns/qualification', {
          order: {
            items: [{ sku_id: '12345', amount: 1 }]
          }
        })
        .reply(200, {})

      client.campaigns.qualifications.examine({
        order: {
          items: [{ sku_id: '12345', amount: 1 }]
        }
      })
        .then(function () {
          server.done()
          done()
        })
    })
  })
})
