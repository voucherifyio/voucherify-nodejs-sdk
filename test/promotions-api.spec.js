/* eslint-env jasmine */
var nock = require('nock')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Promotions API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create promotion campaign', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/campaigns', {
        name: 'test campaign',
        campaign_type: 'PROMOTION'
      })
      .reply(200, {})

    client.promotions.create({
      name: 'test campaign',
      campaign_type: 'PROMOTION'
    })
    .then(function () {
      server.done()
      done()
    })
  })

  it('should validate promotion campaign', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/promotions/validation', {
        order: {
          amount: 25000
        }
      })
      .reply(200, {})

    client.promotions.validate({
      order: {
        amount: 25000
      }
    }).then(function () {
      server.done()
      done()
    })
  })

  describe('promotion tiers', function () {
    it('should list promotion tiers', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/promotions/promo_test_id/tiers')
        .reply(200, {})

      client.promotions.tiers.list('promo_test_id')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should create promotion tier', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/promotions/camp_test_id/tiers', {
          name: 'BMCF 2017 - $20 off for orders above $200'
        })
        .reply(200, {})

      client.promotions.tiers.create('camp_test_id', {
        name: 'BMCF 2017 - $20 off for orders above $200'
      })
      .then(function () {
        server.done()
        done()
      })
    })

    it('should update promotion tier', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .put('/v1/promotions/tiers/promo_test_id', {
          'id': 'promo_test_id',
          'name': 'BMCF 2017 - $20 off for orders above $200',
          'banner': 'Congratulations, you get $20 off!',
          'condition': {
            'orders': {
              'total_amount': {
                '$more_than': [
                  20000
                ]
              }
            }
          },
          'action': {
            'discount': {
              'type': 'AMOUNT',
              'amount_off': 2000
            }
          },
          'metadata': {
            'level': 2
          }
        })
        .reply(200, {})

      client.promotions.tiers.update({
        'id': 'promo_test_id',
        'name': 'BMCF 2017 - $20 off for orders above $200',
        'banner': 'Congratulations, you get $20 off!',
        'condition': {
          'orders': {
            'total_amount': {
              '$more_than': [
                20000
              ]
            }
          }
        },
        'action': {
          'discount': {
            'type': 'AMOUNT',
            'amount_off': 2000
          }
        },
        'metadata': {
          'level': 2
        }
      }).then(function () {
        server.done()
        done()
      })
    })

    it('should delete promotion tier', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/promotions/tiers/promo_test_id')
        .reply(200, {})

      client.promotions.tiers.delete('promo_test_id')
        .then(function () {
          server.done()
          done()
        })
    })
  })
})
