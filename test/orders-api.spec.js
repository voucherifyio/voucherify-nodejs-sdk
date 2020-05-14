/* eslint-env jasmine */
var nock = require('nock')
var { expect } = require('chai')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Orders API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create order', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/orders', {
        name: 'order name'
      })
      .reply(200, {})

    client.orders.create({
      name: 'order name'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should get order', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/orders/ord_test-id')
      .reply(200, {})

    client.orders.get('ord_test-id')
      .then(function () {
        server.done()
        done()
      })
  })

  it('should update order', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/orders/ord_test-id', {
        name: 'order name'
      })
      .reply(200, {})

    client.orders.update({
      id: 'ord_test-id',
      name: 'order name'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  describe('list orders', function () {
    it('should list all', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/orders')
        .reply(200, {})

      client.orders.list()
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/orders')
        .reply(200, [])

      client.orders.list(function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should list by query', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/orders')
        .query({ limit: 100 })
        .reply(200, {})

      client.orders.list({ limit: 100 })
        .then(function () {
          server.done()
          done()
        })
    })
  })
})
