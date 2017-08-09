/* eslint-env jasmine */
var nock = require('nock')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Validation Rules API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create validation rule', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
            .post('/v1/validation-rules', {
              voucher_code: 'test-code',
              redemptions: {
                junction: 'AND',
                count_per_customer: {
                  conditions: {
                    $is: [
                      1
                    ]
                  }
                }
              }
            })
            .reply(200, {})

    client.validationRules.create({
      voucher_code: 'test-code',
      redemptions: {
        junction: 'AND',
        count_per_customer: {
          conditions: {
            $is: [
              1
            ]
          }
        }
      }
    })
            .then(function () {
              server.done()
              done()
            })
  })

  it('should get validation rule', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
            .get('/v1/validation-rules/cust_test-id')
            .reply(200, {})

    client.validationRules.get('cust_test-id')
            .then(function () {
              server.done()
              done()
            })
  })

  it('should update validation rule', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
            .put('/v1/validation-rules/cust_test-id', {
              redemptions: {
                junction: 'AND',
                count_per_customer: {
                  conditions: {
                    $is: [
                      2
                    ]
                  }
                }
              }
            })
            .reply(200, {})

    client.validationRules.update({
      id: 'cust_test-id',
      redemptions: {
        junction: 'AND',
        count_per_customer: {
          conditions: {
            $is: [
              2
            ]
          }
        }
      }
    })
            .then(function () {
              server.done()
              done()
            })
  })

  it('should delete validation rule', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
            .delete('/v1/validation-rules/cust_test-id')
            .reply(200, {})

    client.validationRules.delete('cust_test-id')
            .then(function () {
              server.done()
              done()
            })
  })
})
