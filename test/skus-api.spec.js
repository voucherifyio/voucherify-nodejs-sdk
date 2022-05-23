/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

var nock = require('nock')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
nock.disableNetConnect()

describe('Skus API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should get sku', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/skus/sku_test-id')
      .reply(200, {})

    client.skus.get('sku_test-id')
      .then(function () {
        server.done()
        done()
      })
  })
})
