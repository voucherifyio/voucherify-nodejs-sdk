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

  it('should list validation rules', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
            .get('/v1/validation-rules?limit=10&page=2')
            .reply(200, {})

    client.validationRules.list({limit: 10, page: 2})
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

  describe('validation rule assignment', function () {
    it('should create an assignment', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
              .post('/v1/validation-rules/val_QvHPi3B7hyey/assignments', {
                voucher: 'ABC',
                promotion_tier: 'promo_oh640UsBGnAMrbyzwr4XoPV7',
                campaign: 'camp_XedI6JcOvFOYACJ28nRYTZLc'
              })
              .reply(200, {})

      client.validationRules.createAssignment('val_QvHPi3B7hyey', {
        voucher: 'ABC',
        promotion_tier: 'promo_oh640UsBGnAMrbyzwr4XoPV7',
        campaign: 'camp_XedI6JcOvFOYACJ28nRYTZLc'
      })
      .then(function () {
        server.done()
        done()
      })
    })

    it('should delete an assignment', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
              .delete('/v1/validation-rules/val_QvHPi3B7hyey/assignments/asgm_rvyJPpsiZzbKYgRC')
              .reply(200, {})

      client.validationRules.deleteAssignment('val_QvHPi3B7hyey', 'asgm_rvyJPpsiZzbKYgRC')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list assignments', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
              .get('/v1/validation-rules/val_QvHPi3B7hyey/assignments?limit=5&page=3')
              .reply(200, {})

      client.validationRules.listAssignments('val_QvHPi3B7hyey', {limit: 5, page: 3})
        .then(function () {
          server.done()
          done()
        })
    })
  })

  it('should get validation rule validation result', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
            .post('/v1/validation-rules/val_QvHPi3B7hyey/validation')
            .reply(200, {})

    client.validationRules.validate('val_QvHPi3B7hyey', {})
            .then(function () {
              server.done()
              done()
            })
  })
})
