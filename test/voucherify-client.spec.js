/* eslint-env jasmine */
var nock = require('nock')
var voucherifyClient = require('./client-loader')

describe('VocherifyClient', function () {
  describe('Initialization', function () {
    it('should detect missing applicationId', function () {
      expect(function () {
        voucherifyClient({
          clientSecretKey: 'CLIENT-SECRET-KEY'
        })
      }).toThrow(new Error("Missing required option 'applicationId'"))
    })

    it('should detect missing clientSecretKey', function () {
      expect(function () {
        voucherifyClient({
          applicationId: 'APPLICATION-ID'
        })
      }).toThrow(new Error("Missing required option 'clientSecretKey'"))
    })
  })

  describe('Error handling', function () {
    var client = voucherifyClient({
      applicationId: 'node-sdk-test-id',
      clientSecretKey: 'node-sdk-test-secret'
    })

    it('should return error details', function (done) {
      var server = nock('https://api.voucherify.io')
        .post('/v1/customers', {name: 'customer name'})
        .reply(400, {
          code: 400,
          message: 'Duplicate resource key',
          details: 'Campaign with name: test campaign already exists.',
          key: 'duplicate_resource_key'
        })

      client.customers.create({
        name: 'customer name'
      })
      .catch(function (error) {
        expect(error.code).toEqual(400)
        expect(error.message).toEqual('Duplicate resource key')
        expect(error.details).toEqual('Campaign with name: test campaign already exists.')
        expect(error.key).toEqual('duplicate_resource_key')
        server.done()
        done()
      })
    })

    it('should return error details (callback)', function (done) {
      var server = nock('https://api.voucherify.io')
        .post('/v1/customers', {name: 'customer name'})
        .reply(401, {
          code: 401,
          message: 'No such app.'
        })

      client.customers.create({name: 'customer name'}, function (error) {
        expect(error.code).toEqual(401)
        expect(error.message).toEqual('No such app.')
        server.done()
        done()
      })
    })
  })
})
