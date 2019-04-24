/* eslint-env jasmine */
const nock = require('nock')
const VoucherifyClient = require('./client-loader')
const fixtures = require('./fixtures')
const reqWithoutBody = fixtures.reqWithoutBody
const reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Rewards API', function () {
  const client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create reward', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
    .post('/v1/rewards', {
      name: '5$ discount',
      parameters: {
        campaign: {
          id: 'camp_gtNM5oQJybruzANwYv1mgHk6'
        }
      }
    })
    .reply(200, {})

    client.rewards.create({
      name: '5$ discount',
      parameters: {
        campaign: {
          id: 'camp_gtNM5oQJybruzANwYv1mgHk6'
        }
      }
    })
    .then(function () {
      server.done()
      done()
    })
  })

  it('should get reward', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
    .get('/v1/rewards/reward_test-id')
    .reply(200, {})

    client.rewards.get('reward_test-id')
    .then(function () {
      server.done()
      done()
    })
  })

  it('should update reward', function (done) {
    const server = nock('https://api.voucherify.io', reqWithBody)
    .put('/v1/rewards/reward_test-id', {
      name: '10$ discount'
    })
    .reply(200, {})

    client.rewards.update({
      id: 'reward_test-id',
      name: '10$ discount'
    })
    .then(function () {
      server.done()
      done()
    })
  })

  it('should delete reward', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
    .delete('/v1/rewards/reward_test-id')
    .reply(200, {})

    client.rewards.delete('reward_test-id')
    .then(function () {
      server.done()
      done()
    })
  })

  describe('list', function () {
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
