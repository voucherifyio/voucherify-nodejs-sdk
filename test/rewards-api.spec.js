/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('./client-loader')
const fixtures = require('./fixtures')
const reqWithoutBody = fixtures.reqWithoutBody
nock.disableNetConnect()

describe('Rewards API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  describe('list rewards', function () {
    it('should list all', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/rewards')
        .reply(200, {})

      client.rewards.list()
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/rewards')
        .reply(200, [])

      client.rewards.list(function (err) {
        expect(err).toBeNull()
        server.done()
        done()
      })
    })

    it('should list by query', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/rewards')
        .query({limit: 100})
        .reply(200, {})

      client.rewards.list({limit: 100})
        .then(function () {
          server.done()
          done()
        })
    })
  })
})
