/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

var nock = require('nock')
var { expect } = require('chai')
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
        expect(err).to.be.null
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


  describe('scroll', async function () {
    it('should scroll customers descending', async function () {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/customers')
        .query({ filters: 'value', starting_after: '1970-01-01T00:00:00Z' })
        .reply(200, {has_more: true, customers: [{created_at: '2020-01-01T00:00:00Z'}, {created_at: '2020-01-02T00:00:00Z'}]})

        .get('/v1/customers')
        .query({ filters: 'value', starting_after: '2020-01-02T00:00:00Z' })
        .reply(200, {has_more: false, customers: [{created_at: '2020-01-03T00:00:00Z'}]})


      let callCount = 0
      for await (const customer of client.customers.scroll({ filters: 'value' })) {
        ++callCount
      }

      expect(callCount).to.equal(3)
      await server.done()
    })


    it('should scroll customers ascending', async function () {
      let now = new Date().toISOString()
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/customers')
        .query({ ending_before: now, filters: 'value' })
        .reply(200, {has_more: true, customers: [
          {created_at: '2020-01-04T00:00:00Z'},
          {created_at: '2020-01-03T00:00:00Z'},
          {created_at: '2020-01-02T00:00:00Z'}
        ]})
        .get('/v1/customers')
        .query({ filters: 'value', ending_before: '2020-01-02T00:00:00Z' })
        .reply(200, {has_more: false, customers: [{created_at: '2020-01-01T00:00:00Z'}]})


      let callCount = 0
      for await (const customer of client.customers.scroll({ filters: 'value', ending_before: now })) {
        ++callCount
      }

      expect(callCount).to.equal(4)
      await server.done()
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

  it('should update customer consents', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .put('/v1/customers/cust_test-id/consents')
      .reply(200, {})

    client.customers.updateConsents({
      id: 'cust_test-id'
    }, {
      const_id: true
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should update customer consents by Source ID (when ID not provided)', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .put('/v1/customers/s_test-id/consents')
      .reply(200, {})

    client.customers.updateConsents({
      source_id: 's_test-id'
    }, {
      const_id: true
    })
      .then(function () {
        server.done()
        done()
      })
  })
})
