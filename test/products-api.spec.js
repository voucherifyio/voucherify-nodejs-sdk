/* eslint-env jasmine */
var nock = require('nock')
var { expect } = require('chai')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Products API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create product', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/products', {
        name: 'product name'
      })
      .reply(200, {})

    client.products.create({
      name: 'product name'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should get product', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/products/prod_test-id')
      .reply(200, {})

    client.products.get('prod_test-id')
      .then(function () {
        server.done()
        done()
      })
  })

  it('should update product', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/products/prod_test-id', {
        name: 'product name'
      })
      .reply(200, {})

    client.products.update({
      id: 'prod_test-id',
      name: 'product name'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should update products in bulk', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/products/bulk', [{
        source_id: 'product_1'
      }, {
        source_id: 'product_2'
      }])
      .reply(200, [{
        source_id: 'product_1',
        found: true,
        updated: true
      }, {
        source_id: 'product_2',
        found: false,
        updated: true
      }])

    client.products.bulkUpdate([{
      source_id: 'product_1'
    }, {
      source_id: 'product_2'
    }])
      .then(function () {
        server.done()
        done()
      })
  })

  it('should delete product', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/products/prod_test-id')
      .reply(200, {})

    client.products.delete('prod_test-id')
      .then(function () {
        server.done()
        done()
      })
  })

  it('should delete product permanently', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/products/prod_test-id')
      .query({ force: true })
      .reply(200, {})

    client.products.delete('prod_test-id', { force: true })
      .then(function () {
        server.done()
        done()
      })
  })

  describe('list products', function () {
    it('should list all', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/products')
        .reply(200, {})

      client.products.list()
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/products')
        .reply(200, [])

      client.products.list(function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should list by query', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/products')
        .query({ limit: 100 })
        .reply(200, {})

      client.products.list({ limit: 100 })
        .then(function () {
          server.done()
          done()
        })
    })
  })

  describe('SKU', function () {
    it('should create SKU', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/products/prod_test-id/skus', {
          sku: 'test sku'
        })
        .reply(200, {})

      client.products.createSku('prod_test-id', {
        sku: 'test sku'
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should get SKU', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/products/prod_test-id/skus/test-sku')
        .reply(200, {})

      client.products.getSku('prod_test-id', 'test-sku')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should update SKU', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .put('/v1/products/prod_test-id/skus/test-sku', {
          metadata: {
            isTestSku: true
          }
        })
        .reply(200, {})

      client.products.updateSku('prod_test-id', {
        id: 'test-sku',
        metadata: {
          isTestSku: true
        }
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should delete SKU', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/products/prod_test-id/skus/test-sku')
        .reply(200, {})

      client.products.deleteSku('prod_test-id', 'test-sku')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should delete SKU permanently', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/products/prod_test-id/skus/test-sku')
        .query({ force: true })
        .reply(200, {})

      client.products.deleteSku('prod_test-id', 'test-sku', { force: true })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list SKUs', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/products/prod_test-id/skus')
        .reply(200, {})

      client.products.listSkus('prod_test-id')
        .then(function () {
          server.done()
          done()
        })
    })
  })
})
