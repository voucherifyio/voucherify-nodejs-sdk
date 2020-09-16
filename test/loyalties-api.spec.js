/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const nock = require('nock')
var { expect } = require('chai')
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
      expect(err).to.be.null
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
      expect(err).to.be.null
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
      expect(err).to.be.null
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
      expect(err).to.be.null
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
      expect(err).to.be.null
      server.done()
      done()
    })
  })

  it('should list all loyalty programs by query', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/loyalties')
      .query({ limit: 100 })
      .reply(200, {})

    client.loyalties.list({ limit: 100 })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should list all loyalty programs by query (callback)', function (done) {
    const server = nock('https://api.voucherify.io', reqWithoutBody)
      .get('/v1/loyalties')
      .query({ limit: 100 })
      .reply(200, {})

    client.loyalties.list({ limit: 100 }, function (err) {
      expect(err).to.be.null
      server.done()
      done()
    })
  })

  describe('reward assignments', function () {
    it('should create loyalty reward assignment', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/loyalties/campaign_test-id/rewards', [{
          reward: 'rew_2yGflHThU2yJwFECEFKrXBI2',
          parameters: {
            loyalty: {
              points: 15
            }
          }
        }])
        .reply(200, {})

      client.loyalties.createRewardAssignments('campaign_test-id', [{
        reward: 'rew_2yGflHThU2yJwFECEFKrXBI2',
        parameters: {
          loyalty: {
            points: 15
          }
        }
      }])
        .then(function () {
          server.done()
          done()
        })
    })

    it('should create loyalty reward assignment (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/loyalties/campaign_test-id/rewards', [{
          reward: 'rew_2yGflHThU2yJwFECEFKrXBI2',
          parameters: {
            loyalty: {
              points: 15
            }
          }
        }])
        .reply(200, {})

      client.loyalties.createRewardAssignments('campaign_test-id', [{
        reward: 'rew_2yGflHThU2yJwFECEFKrXBI2',
        parameters: {
          loyalty: {
            points: 15
          }
        }
      }], function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should update loyalty reward assignment', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .put('/v1/loyalties/campaign_test-id/rewards/reward_assignment_test-id', {
          parameters: {
            loyalty: {
              points: 3
            }
          }
        })
        .reply(200, {})

      client.loyalties.updateRewardAssignment('campaign_test-id', {
        id: 'reward_assignment_test-id',
        parameters: {
          loyalty: {
            points: 3
          }
        }
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should update loyalty reward assignment (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .put('/v1/loyalties/campaign_test-id/rewards/reward_assignment_test-id', {
          parameters: {
            loyalty: {
              points: 3
            }
          }
        })
        .reply(200, {})

      client.loyalties.updateRewardAssignment('campaign_test-id', {
        id: 'reward_assignment_test-id',
        parameters: {
          loyalty: {
            points: 3
          }
        }
      }, function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should delete loyalty reward assignment', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/loyalties/campaign_test-id/rewards/reward_assignment_test-id')
        .reply(200, {})

      client.loyalties.deleteRewardAssignment('campaign_test-id', 'reward_assignment_test-id')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should delete loyalty reward assignment (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/loyalties/campaign_test-id/rewards/reward_assignment_test-id')
        .reply(200, {})

      client.loyalties.deleteRewardAssignment('campaign_test-id', 'reward_assignment_test-id', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should list all loyalty reward assignments', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/rewards')
        .reply(200, {})

      client.loyalties.listRewardAssignments('campaign_test-id')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all loyalty reward assignments (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/rewards')
        .reply(200, {})

      client.loyalties.listRewardAssignments('campaign_test-id', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should list all loyalty reward assignments by query', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/rewards')
        .query({ limit: 100 })
        .reply(200, {})

      client.loyalties.listRewardAssignments('campaign_test-id', { limit: 100 })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all loyalty reward assignments by query (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/rewards')
        .query({ limit: 100 })
        .reply(200, {})

      client.loyalties.listRewardAssignments('campaign_test-id', { limit: 100 }, function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })
  })

  describe('earning rules', function () {
    it('should create loyalty earning rules', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/loyalties/campaign_test-id/earning-rules', [{
          event: 'order.paid',
          validation_rule_id: null,
          loyalty: {
            points: 3
          },
          source: {
            banner: 'You will get 3 points'
          }
        }])
        .reply(200, {})

      client.loyalties.createEarningRule('campaign_test-id', [{
        event: 'order.paid',
        validation_rule_id: null,
        loyalty: {
          points: 3
        },
        source: {
          banner: 'You will get 3 points'
        }
      }])
        .then(function () {
          server.done()
          done()
        })
    })

    it('should create loyalty earning rules (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/loyalties/campaign_test-id/earning-rules', [{
          event: 'order.paid',
          validation_rule_id: null,
          loyalty: {
            points: 3
          },
          source: {
            banner: 'You will get 3 points'
          }
        }])
        .reply(200, {})

      client.loyalties.createEarningRule('campaign_test-id', [{
        event: 'order.paid',
        validation_rule_id: null,
        loyalty: {
          points: 3
        },
        source: {
          banner: 'You will get 3 points'
        }
      }], function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should update loyalty earning rule', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .put('/v1/loyalties/campaign_test-id/earning-rules/earning_rules_test-id', {
          loyalty: {
            points: 21
          }
        })
        .reply(200, {})

      client.loyalties.updateEarningRule('campaign_test-id', {
        id: 'earning_rules_test-id',
        loyalty: {
          points: 21
        }
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should update loyalty earning rule (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .put('/v1/loyalties/campaign_test-id/earning-rules/earning_rules_test-id', {
          loyalty: {
            points: 21
          }
        })
        .reply(200, {})

      client.loyalties.updateEarningRule('campaign_test-id', {
        id: 'earning_rules_test-id',
        loyalty: {
          points: 21
        }
      }, function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should delete loyalty earning rule', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/loyalties/campaign_test-id/earning-rules/earning_rules_test-id')
        .reply(200, {})

      client.loyalties.deleteEarningRule('campaign_test-id', 'earning_rules_test-id')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should delete loyalty earning rule (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .delete('/v1/loyalties/campaign_test-id/earning-rules/earning_rules_test-id')
        .reply(200, {})

      client.loyalties.deleteEarningRule('campaign_test-id', 'earning_rules_test-id', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should list all loyalty earning rules', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/earning-rules')
        .reply(200, {})

      client.loyalties.listEarningRules('campaign_test-id')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all loyalty earning rules (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/earning-rules')
        .reply(200, {})

      client.loyalties.listEarningRules('campaign_test-id', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should list all loyalty earning rules by query', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/earning-rules')
        .query({ limit: 100 })
        .reply(200, {})

      client.loyalties.listEarningRules('campaign_test-id', { limit: 100 })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all loyalty earning rules by query (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/earning-rules')
        .query({ limit: 100 })
        .reply(200, {})

      client.loyalties.listEarningRules('campaign_test-id', { limit: 100 }, function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })
  })

  describe('members', function () {
    it('should create loyalty member', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/loyalties/campaign_test-id/members', {
          customer: {
            source_id: 'test-user@voucherify.io',
            email: 'test-user@voucherify.io',
            name: 'Test User'
          },
          metadata: {
            test: true,
            provider: 'Shop Admin'
          }
        })
        .reply(200, {})

      client.loyalties.createMember('campaign_test-id', {
        customer: {
          source_id: 'test-user@voucherify.io',
          email: 'test-user@voucherify.io',
          name: 'Test User'
        },
        metadata: {
          test: true,
          provider: 'Shop Admin'
        }
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should create loyalty member (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/loyalties/campaign_test-id/members', {
          customer: {
            source_id: 'test-user@voucherify.io',
            email: 'test-user@voucherify.io',
            name: 'Test User'
          },
          metadata: {
            test: true,
            provider: 'Shop Admin'
          }
        })
        .reply(200, {})

      client.loyalties.createMember('campaign_test-id', {
        customer: {
          source_id: 'test-user@voucherify.io',
          email: 'test-user@voucherify.io',
          name: 'Test User'
        },
        metadata: {
          test: true,
          provider: 'Shop Admin'
        }
      }, function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should get loyalty member', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/members/member_test-id')
        .reply(200, {})

      client.loyalties.getMember('campaign_test-id', 'member_test-id')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should get loyalty member (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/members/member_test-id')
        .reply(200, {})

      client.loyalties.getMember('campaign_test-id', 'member_test-id', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should list all loyalty members', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/members')
        .reply(200, {})

      client.loyalties.listMembers('campaign_test-id')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all loyalty members (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/members')
        .reply(200, {})

      client.loyalties.listMembers('campaign_test-id', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should list all loyalty members by query', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/members')
        .query({ limit: 100 })
        .reply(200, {})

      client.loyalties.listMembers('campaign_test-id', { limit: 100 })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should list all loyalty members by query (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/members')
        .query({ limit: 100 })
        .reply(200, {})

      client.loyalties.listMembers('campaign_test-id', { limit: 100 }, function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should get member activities', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/members/member_test-id/activities')
        .reply(200, {})

      client.loyalties.getMemberActivities('campaign_test-id', 'member_test-id')
        .then(function () {
          server.done()
          done()
        })
    })

    it('should get member activities (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithoutBody)
        .get('/v1/loyalties/campaign_test-id/members/member_test-id/activities')
        .reply(200, {})

      client.loyalties.getMemberActivities('campaign_test-id', 'member_test-id', function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should add loyalty points', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/loyalties/campaign_test-id/members/member_test-id/balance', {
          points: 2000
        })
        .reply(200, {})

      client.loyalties.addPoints('campaign_test-id', 'member_test-id', {
        points: 2000
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should add loyalty points (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/loyalties/campaign_test-id/members/member_test-id/balance', {
          points: 2000
        })
        .reply(200, {})

      client.loyalties.addPoints('campaign_test-id', 'member_test-id', {
        points: 2000
      }, function (err) {
        expect(err).to.be.null
        server.done()
        done()
      })
    })

    it('should redeem reward', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/loyalties/campaign_test-id/members/member_test-id/redemption', {
          reward: {
            id: 'rew_2yGflHThU2yJwFECEFKrXBI2'
          },
          metadata: {
            locale: 'en-GB'
          }
        })
        .reply(200, {})

      client.loyalties.redeemReward('campaign_test-id', 'member_test-id', {
        reward: {
          id: 'rew_2yGflHThU2yJwFECEFKrXBI2'
        },
        metadata: {
          locale: 'en-GB'
        }
      })
        .then(function () {
          server.done()
          done()
        })
    })

    it('should redeem reward (callback)', function (done) {
      const server = nock('https://api.voucherify.io', reqWithBody)
        .post('/v1/loyalties/campaign_test-id/members/member_test-id/redemption', {
          reward: {
            id: 'rew_2yGflHThU2yJwFECEFKrXBI2'
          },
          metadata: {
            locale: 'en-GB'
          }
        })
        .reply(200, {})

      client.loyalties.redeemReward('campaign_test-id', 'member_test-id', {
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
})
