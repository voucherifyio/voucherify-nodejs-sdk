/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('./client-loader')
const fixtures = require('./fixtures')
const reqWithoutBody = fixtures.reqWithoutBody
const reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Loyalties API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create loyalty program', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/loyalties', {
        name: 'Loyalty Program 1',
        start_date: '2016-10-26T00:00:00Z',
        vouchers_count: 1000,
        voucher: {
          type: 'LOYALTY_CARD',
          loyalty_card: {
            points: 0
          },
          redemption: {},
          code_config: {
            pattern: 'L-CARD-#######'
          }
        },
        metadata: {
          test: true
        },
        type: 'AUTO-UPDATE'
      })
      .reply(200, {})

    client.loyalties.create({
      name: 'Loyalty Program 1',
      start_date: '2016-10-26T00:00:00Z',
      vouchers_count: 1000,
      voucher: {
        type: 'LOYALTY_CARD',
        loyalty_card: {
          points: 0
        },
        redemption: {},
        code_config: {
          pattern: 'L-CARD-#######'
        }
      },
      metadata: {
        test: true
      },
      type: 'AUTO-UPDATE'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should create loyalty program (callback)', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/loyalties', {
        name: 'Loyalty Program 1',
        start_date: '2016-10-26T00:00:00Z',
        vouchers_count: 1000,
        voucher: {
          type: 'LOYALTY_CARD',
          loyalty_card: {
            points: 0
          },
          redemption: {},
          code_config: {
            pattern: 'L-CARD-#######'
          }
        },
        metadata: {
          test: true
        },
        type: 'AUTO-UPDATE'
      })
      .reply(200, {})

    client.loyalties.create({
      name: 'Loyalty Program 1',
      start_date: '2016-10-26T00:00:00Z',
      vouchers_count: 1000,
      voucher: {
        type: 'LOYALTY_CARD',
        loyalty_card: {
          points: 0
        },
        redemption: {},
        code_config: {
          pattern: 'L-CARD-#######'
        }
      },
      metadata: {
        test: true
      },
      type: 'AUTO-UPDATE'
    }, function (err) {
      expect(err).toBeNull()
      server.done()
      done()
    })
  })

  it('should get loyalty program', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/loyalties/campaign_test-id')
      .reply(200, {})

    client.loyalties.get('campaign_test-id')
      .then(function () {
        server.done()
        done()
      })
  })

  it('should get loyalty program (callback)', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/loyalties/campaign_test-id')
      .reply(200, {})

    client.loyalties.get('campaign_test-id', function (err) {
      expect(err).toBeNull()
      server.done()
      done()
    })
  })

  it('should update loyalty program', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/loyalties/campaign_test-id', {
        description: 'Test program'
      })
      .reply(200, {})

    client.loyalties.update({
      id: 'campaign_test-id',
      description: 'Test program'
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should update loyalty program (callback)', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
      .put('/v1/loyalties/campaign_test-id', {
        description: 'Test program'
      })
      .reply(200, {})

    client.loyalties.update({
      id: 'campaign_test-id',
      description: 'Test program'
    }, function (err) {
      expect(err).toBeNull()
      server.done()
      done()
    })
  })

  it('should delete loyalty program', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/loyalties/campaign_test-id')
      .reply(200, {})

    client.loyalties.delete('campaign_test-id')
      .then(function () {
        server.done()
        done()
      })
  })

  it('should delete loyalty program (callback)', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .delete('/v1/loyalties/campaign_test-id')
      .reply(200, {})

    client.loyalties.delete('campaign_test-id', function (err) {
      expect(err).toBeNull()
      server.done()
      done()
    })
  })

  it('should list all loyalty programs', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/loyalties')
      .reply(200, {})

    client.loyalties.list()
      .then(function () {
        server.done()
        done()
      })
  })

  it('should list all loyalty programs (callback)', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/loyalties')
      .reply(200, [])

    client.loyalties.list(function (err) {
      expect(err).toBeNull()
      server.done()
      done()
    })
  })

  it('should list all loyalty programs by query', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/loyalties')
      .query({limit: 100})
      .reply(200, {})

    client.loyalties.list({limit: 100})
      .then(function () {
        server.done()
        done()
      })
  })

  it('should list all loyalty programs by query (callback)', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/loyalties')
      .query({limit: 100})
      .reply(200, {})

    client.loyalties.list({limit: 100}, function (err) {
      expect(err).toBeNull()
      server.done()
      done()
    })
  })
})
