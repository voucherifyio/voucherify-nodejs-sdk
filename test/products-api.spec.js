/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('./client-loader')
const {reqWithoutBody, reqWithBody} = require('./fixtures')
nock.disableNetConnect()

describe('Products API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create product', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/products', {
        name: 'product name'
      })
      .reply(200, {})

    client.products.create({
      name: 'product name'
    })
    .then(() => {
      server.done()
      done()
    })
  })

  it('should get product', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/products/prod_test-id')
      .reply(200, {})

    client.products.get('prod_test-id')
      .then(() => {
        server.done()
        done()
      })
  })

  it('should update product', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/products/prod_test-id', {
        name: 'product name'
      })
      .reply(200, {})

    client.products.update({
      id: 'prod_test-id',
      name: 'product name'
    })
    .then(() => {
      server.done()
      done()
    })
  })

  it('should delete product', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/products/prod_test-id')
      .reply(200, {})

    client.products.delete('prod_test-id')
    .then(() => {
      server.done()
      done()
    })
  })

  describe('list products', function () {
    it('should list all', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/products')
      .reply(200, {})

      client.products.list()
      .then(() => {
        server.done()
        done()
      })
    })

    it('should list all (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/products')
      .reply(200, [])

      client.products.list((err) => {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should list by query', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/products')
      .query({limit: 100})
      .reply(200, {})

      client.products.list({limit: 100})
      .then(() => {
        server.done()
        done()
      })
    })
  })

  describe('SKU', function () {
    it('should create SKU', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/products/prod_test-id/skus', {
        sku: 'test sku'
      })
      .reply(200, {})

      client.products.createSku('prod_test-id', {
        sku: 'test sku'
      })
      .then(() => {
        server.done()
        done()
      })
    })

    it('should get SKU', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/products/prod_test-id/skus/test-sku')
      .reply(200, {})

      client.products.getSku('prod_test-id', 'test-sku')
      .then(() => {
        server.done()
        done()
      })
    })

    it('should update SKU', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
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
      .then(() => {
        server.done()
        done()
      })
    })

    it('should delete SKU', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/products/prod_test-id/skus/test-sku')
      .reply(200, {})

      client.products.deleteSku('prod_test-id', 'test-sku')
      .then(() => {
        server.done()
        done()
      })
    })

    it('should list SKUs', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/products/prod_test-id/skus')
      .reply(200, {})

      client.products.listSkus('prod_test-id')
      .then(() => {
        server.done()
        done()
      })
    })
  })
})
