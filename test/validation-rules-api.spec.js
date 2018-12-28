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
              name: 'Redeemable Once for new Customers',
              rules: {
                '1': {
                  name: 'customer.segment',
                  conditions: {
                    $is: ['seg_n3vVcU5t0m3rs4rEPr3C1oU5']
                  }
                },
                '2': {
                  name: 'redemption.count.per_customer',
                  conditions: {
                    $less_than_or_equal: [1]
                  }
                },
                logic: '1 and 2'
              }
            })
            .reply(200, {})

    client.validationRules.create({
      name: 'Redeemable Once for new Customers',
      rules: {
        '1': {
          name: 'customer.segment',
          conditions: {
            $is: ['seg_n3vVcU5t0m3rs4rEPr3C1oU5']
          }
        },
        '2': {
          name: 'redemption.count.per_customer',
          conditions: {
            $less_than_or_equal: [1]
          }
        },
        logic: '1 and 2'
      }
    })
    .then(function () {
      server.done()
      done()
    })
  })

  it('should get validation rule', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
            .get('/v1/validation-rules/val_QvHPi3B7hyey')
            .reply(200, {})

    client.validationRules.get('val_QvHPi3B7hyey')
            .then(function () {
              server.done()
              done()
            })
  })

  it('should update validation rule', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
            .put('/v1/validation-rules/val_QvHPi3B7hyey', {
              name: 'Redeemable twice for new Customers',
              rules: {
                '1': {
                  name: 'customer.segment',
                  conditions: {
                    $is: ['seg_n3vVcU5t0m3rs4rEPr3C1oU5']
                  }
                },
                '2': {
                  name: 'redemption.count.per_customer',
                  conditions: {
                    $less_than_or_equal: [2]
                  }
                },
                logic: '1 and 2'
              }
            })
            .reply(200, {})

    client.validationRules.update({
      id: 'val_QvHPi3B7hyey',
      name: 'Redeemable twice for new Customers',
      rules: {
        '1': {
          name: 'customer.segment',
          conditions: {
            $is: ['seg_n3vVcU5t0m3rs4rEPr3C1oU5']
          }
        },
        '2': {
          name: 'redemption.count.per_customer',
          conditions: {
            $less_than_or_equal: [2]
          }
        },
        logic: '1 and 2'
      }
    })
    .then(function () {
      server.done()
      done()
    })
  })

  it('should delete validation rule', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
            .delete('/v1/validation-rules/val_Z755MnH1Xow1')
            .reply(200, {})

    client.validationRules.delete('val_Z755MnH1Xow1')
            .then(function () {
              server.done()
              done()
            })
  })
})
