/* eslint-env jasmine */
var nock = require('nock')
var { expect } = require('chai')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithoutBody = fixtures.reqWithoutBody
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Redemptions API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  describe('redeem', function () {
    it('should redeem by code', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test-code/redemption')
        .reply(200, {})

      client.redemptions.redeem('test-code')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should redeem by code (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test-code/redemption')
        .reply(200, {})

      client.redemptions.redeem('test-code', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should redeem by voucher (DEPRECATED!)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test-code/redemption', {
          customer: {
            id: 'test-customer-id'
          }
        })
        .reply(200, {})

      client.redemptions.redeem({
        voucher: 'test-code',
        customer: {
          id: 'test-customer-id'
        }
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should redeem by voucher', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test-code/redemption', {
          customer: {
            id: 'test-customer-id'
          }
        })
        .reply(200, {})

      client.redemptions.redeem('test-code', {
        customer: {
          id: 'test-customer-id'
        }
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should redeem with tracking ID', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test-code/redemption')
        .query({ tracking_id: 'test-tracking-id' })
        .reply(200, {})

      client.redemptions.redeem('test-code', 'test-tracking-id')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should redeem promotion', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/promotions/tiers/promo_test_id/redemption', {
          customer: {
            id: 'cust_test_id'
          },
          order: {
            amount: 25000
          }
        })
        .reply(200, {})

      client.redemptions.redeem({
        id: 'promo_test_id'
      }, {
        customer: {
          id: 'cust_test_id'
        },
        order: {
          amount: 25000
        }
      }).then(function () {
        server.done()
        done()
      })
    })

    it('should redeem promotion (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/promotions/tiers/promo_test_id/redemption', {
          customer: {
            id: 'cust_test_id'
          },
          order: {
            amount: 25000
          }
        })
        .reply(200, {})

      client.redemptions.redeem({
        id: 'promo_test_id'
      }, {
        customer: {
          id: 'cust_test_id'
        },
        order: {
          amount: 25000
        }
      }, function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should redeem loyalty card', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/loyalty_card_test-id/redemption', {
          reward: {
            id: 'rew_2yGflHThU2yJwFECEFKrXBI2'
          },
          metadata: {
            locale: 'en-GB'
          }
        })
        .reply(200, {})

      client.redemptions.redeem('loyalty_card_test-id', {
        reward: {
          id: 'rew_2yGflHThU2yJwFECEFKrXBI2'
        },
        metadata: {
          locale: 'en-GB'
        }
      }).then(function () {
        server.done()
        done()
      })
    })

    it('should redeem loyalty card (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/loyalty_card_test-id/redemption', {
          reward: {
            id: 'rew_2yGflHThU2yJwFECEFKrXBI2'
          },
          metadata: {
            locale: 'en-GB'
          }
        })
        .reply(200, {})

      client.redemptions.redeem('loyalty_card_test-id', {
        reward: {
          id: 'rew_2yGflHThU2yJwFECEFKrXBI2'
        },
        metadata: {
          locale: 'en-GB'
        }
      }, function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })
  })

  describe('list', function () {
    it('should list by query', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/redemptions')
        .query({ limit: 100 })
        .reply(200, {})

      client.redemptions.list({
        limit: 100
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/redemptions')
        .reply(200, {})

      client.redemptions.list()
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/redemptions')
        .reply(200, {})

      client.redemptions.list(function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })
  })

  it('should get voucher redemptions', function (done) {
    var server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/vouchers/test-code/redemption')
      .reply(200, {})

    client.redemptions.getForVoucher('test-code', function (err) {
      expect(err).to.be.null
      server.done()
      done()
    })
  })

  describe('rollback', function () {
    it('should rollback without customer details', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/redemptions/test-redemption-id/rollback')
        .reply(200, {})

      client.redemptions.rollback('test-redemption-id')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should rollback without customer details (callback)', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/redemptions/test-redemption-id/rollback')
        .reply(200, {})

      client.redemptions.rollback('test-redemption-id', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should rollback with customer details', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/redemptions/test-redemption-id/rollback', {
          customer: {
            id: 'test-customer-id'
          }
        })
        .reply(200, {})

      client.redemptions.rollback('test-redemption-id', {
        customer: {
          id: 'test-customer-id'
        }
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should rollback with customer details, reason and tracking_id', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/redemptions/test-redemption-id/rollback', {
          customer: {
            id: 'test-customer-id'
          }
        })
        .query({
          reason: 'test%20reason',
          tracking_id: 'test-tracking-id'
        })
        .reply(200, {})

      client.redemptions.rollback('test-redemption-id', {
        reason: 'test reason',
        tracking_id: 'test-tracking-id',
        customer: {
          id: 'test-customer-id'
        }
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should rollback with a reason', function (done) {
      var server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/redemptions/test-redemption-id/rollback')
        .query({
          reason: 'test%20reason'
        })
        .reply(200, {})

      client.redemptions.rollback('test-redemption-id', 'test reason')
        .then(function () {
          server.done()
          done()
        })
    })
  })
})
