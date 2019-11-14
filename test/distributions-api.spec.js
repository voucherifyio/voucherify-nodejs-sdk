/* eslint-env jasmine */
var nock = require('nock')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithBody = fixtures.reqWithBody
var reqWithoutBody = fixtures.reqWithoutBody

nock.disableNetConnect()

describe('Distributions API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  describe('publish voucher', function () {
    it('should publish by voucher', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/publish', {
          campaign: 'test-campaign',
          voucher: 'test-voucher',
          customer: 'test@custom.er'
        })
        .reply(200, {})

      client.distributions.publish({
        campaign: 'test-campaign',
        voucher: 'test-voucher',
        customer: 'test@custom.er'
      })
      .then(function () {
        server.done()
        done()
      })
    })
  })

  describe('create publication', function () {
    it('should create publication', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/publications', {
          campaign: {
            name: 'test-campaign',
            count: '5'
          },
          customer: {
              source_id: 'test-source-id',
              email: 'test@custom.er',
              name: 'Test customer name'
          }
        })
        .reply(200, {})

      client.distributions.publications.create({
        campaign: {
          name: 'test-campaign',
          count: '5'
        },
        customer: {
            source_id: 'test-source-id',
            email: 'test@custom.er',
            name: 'Test customer name'
        }
      })
      .then(function () {
        server.done()
        done()
      })
    })
  })

  describe('list publications', function () {
    it('should list all publications', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/publications')
      .reply(200, [])

      client.distributions.publications.list()
      .then(function () {
        server.done()
        done()
      })
    })

    it('should list all publications (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/publications')
      .reply(200, [])

      client.distributions.publications.list(function (err) {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should list publications by query', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/publications')
      .query({campaign: 'test-campaign'})
      .reply(200, [])

      client.distributions.publications.list({campaign: 'test-campaign'})
      .then(function () {
        server.done()
        done()
      })
    })
  })

  describe('exports', function () {
    it('should create export', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/exports', {
        exported_object: 'voucher',
        parameters: {}
      })
      .reply(200, {})

      client.distributions.exports.create({
        exported_object: 'voucher',
        parameters: {}
      })
      .then(function () {
        server.done()
        done()
      })
    })

    it('should get export', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/exports/exp_test-id')
      .reply(200, {})

      client.distributions.exports.get('exp_test-id')
      .then(function () {
        server.done()
        done()
      })
    })

    it('should delete export', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/exports/exp_test-id')
      .reply(200, {})

      client.distributions.exports.delete('exp_test-id')
      .then(function () {
        server.done()
        done()
      })
    })
  })
})
