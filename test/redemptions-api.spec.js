/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('./client-loader')
const {reqWithoutBody, reqWithBody} = require('./fixtures')
nock.disableNetConnect()

describe('Redemptions API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  describe('redeem', function () {
    it('should redeem by code', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test-code/redemption')
        .reply(200, {})

      client.redemptions.redeem('test-code')
        .then(() => {
          server.done()
          done()
        })
    })

    it('should redeem by code (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test-code/redemption')
        .reply(200, {})

      client.redemptions.redeem('test-code', (err) => {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should redeem by voucher (DEPRECATED!)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
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
      .then(() => {
        server.done()
        done()
      })
    })

    it('should redeem by voucher', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
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
      .then(() => {
        server.done()
        done()
      })
    })

    it('should redeem with tracking ID', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/vouchers/test-code/redemption')
        .query({tracking_id: 'test-tracking-id'})
        .reply(200, {})

      client.redemptions.redeem('test-code', 'test-tracking-id')
        .then(() => {
          server.done()
          done()
        })
    })
  })

  describe('list', function () {
    it('should list by query', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/redemptions')
        .query({limit: 100})
        .reply(200, {})

      client.redemptions.list({
        limit: 100
      })
      .then(() => {
        server.done()
        done()
      })
    })

    it('should list all', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/redemptions')
      .reply(200, {})

      client.redemptions.list()
      .then(() => {
        server.done()
        done()
      })
    })

    it('should list all (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/redemptions')
        .reply(200, {})

      client.redemptions.list((err) => {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })
  })

  it('should get voucher redemptions', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/vouchers/test-code/redemption')
      .reply(200, {})

    client.redemptions.getForVoucher('test-code', (err) => {
      expect(err).toBeNull()
      server.done()
      done()
    })
  })

  describe('rollback', function () {
    it('should rollback without customer details', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/redemptions/test-redemption-id/rollback')
        .reply(200, {})

      client.redemptions.rollback('test-redemption-id')
      .then(() => {
        server.done()
        done()
      })
    })

    it('should rollback without customer details (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/redemptions/test-redemption-id/rollback')
        .reply(200, {})

      client.redemptions.rollback('test-redemption-id', (err) => {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should rollback with customer details', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
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
      .then(() => {
        server.done()
        done()
      })
    })

    it('should rollback with customer details, reason and tracking_id', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
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
      .then(() => {
        server.done()
        done()
      })
    })

    it('should rollback with a reason', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/redemptions/test-redemption-id/rollback')
        .query({
          reason: 'test%20reason'
        })
        .reply(200, {})

      client.redemptions.rollback('test-redemption-id', 'test reason')
      .then(() => {
        server.done()
        done()
      })
    })
  })
})
