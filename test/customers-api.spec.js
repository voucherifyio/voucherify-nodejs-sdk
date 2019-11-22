/* eslint-env jasmine */
var nock = require('nock')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Customers API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create customer', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/customers', {
        name: 'customer name'
      })
      .reply(200, {})

    client.customers.create({
      name: 'customer name'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should get customer', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/customers/cust_test-id')
      .reply(200, {})

    client.customers.get('cust_test-id')
      .then(function () {
        server.done()
        done()
      })
  })

  describe('list', function () {
    it('should list all customers', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/customers')
        .reply(200, [])

      client.customers.list()
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all customers (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/customers')
        .reply(200, [])

      client.customers.list(function (err) {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should list customers by query', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/customers')
        .query({ city: 'chicago' })
        .reply(200, [])

      client.customers.list({ city: 'chicago' })
        .then(function () {
          server.done()
          done()
        })
    })
  })

  it('should update customer by ID', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/customers/cust_test-id', {
        source_id: 's_test-id',
        name: 'customer name'
      })
      .reply(200, {})

    client.customers.update({
      id: 'cust_test-id',
      source_id: 's_test-id',
      name: 'customer name'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should update customer by Source ID (when ID not provided)', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/customers/s_test-id', {
        source_id: 's_test-id',
        name: 'customer name'
      })
      .reply(200, {})

    client.customers.update({
      source_id: 's_test-id',
      name: 'customer name'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should delete customer', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/customers/cust_test-id')
      .reply(200, {})

    client.customers.delete('cust_test-id')
      .then(function () {
        server.done()
        done()
      })
  })
})
