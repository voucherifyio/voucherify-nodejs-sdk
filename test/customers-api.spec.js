/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('./client-loader')
const fixtures = require('./fixtures')
const reqWithoutBody = fixtures.reqWithoutBody
const reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Customers API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create customer', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
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
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/customers/cust_test-id')
      .reply(200, {})

    client.customers.get('cust_test-id')
      .then(function () {
        server.done()
        done()
      })
  })

  it('should update customer', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/customers/cust_test-id', {
        name: 'customer name'
      })
      .reply(200, {})

    client.customers.update({
      id: 'cust_test-id',
      name: 'customer name'
    })
    .then(function () {
      server.done()
      done()
    })
  })

  it('should delete customer', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/customers/cust_test-id')
      .reply(200, {})

    client.customers.delete('cust_test-id')
    .then(function () {
      server.done()
      done()
    })
  })
})
