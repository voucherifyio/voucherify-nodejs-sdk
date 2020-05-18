/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

var nock = require('nock')
var { expect } = require('chai')
var VoucherifyClient = require('./client-loader')
var fixtures = require('./fixtures')
var reqWithBody = fixtures.reqWithBody
nock.disableNetConnect()

describe('Events API', function () {
  var client = new VoucherifyClient({
    applicationId: 'node-sdk-test-id',
    clientSecretKey: 'node-sdk-test-secret'
  })

  it('should create event', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/events', {
        event: 'custom event name',
        customer: {
          id: 'cust_test-id',
          source_id: 's_test-id',
          name: 'customer name'
        },
        metadata: {
          lang: 'en',
          test: true
        }
      })
      .reply(200, true)

    client.events.create('custom event name', {
      customer: {
        id: 'cust_test-id',
        source_id: 's_test-id',
        name: 'customer name'
      },
      metadata: {
        lang: 'en',
        test: true
      }
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should create event (callback)', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/events', {
        event: 'custom event name',
        customer: {
          id: 'cust_test-id',
          source_id: 's_test-id',
          name: 'customer name'
        },
        metadata: {
          lang: 'en',
          test: true
        }
      })
      .reply(200, true)

    client.events.create('custom event name', {
      customer: {
        id: 'cust_test-id',
        source_id: 's_test-id',
        name: 'customer name'
      },
      metadata: {
        lang: 'en',
        test: true
      }
    }, function (err) {
      expect(err).to.be.null
      server.done()
      done()
    })
  })

  it('should create event for loyalty', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/events', {
        event: 'custom event name',
        customer: {
          id: 'cust_test-id',
          source_id: 's_test-id',
          name: 'customer name'
        },
        loyalty: {
          code: 'loyalty_code_test-id'
        },
        metadata: {
          lang: 'en',
          test: true
        }
      })
      .reply(200, true)

    client.events.create('custom event name', {
      customer: {
        id: 'cust_test-id',
        source_id: 's_test-id',
        name: 'customer name'
      },
      loyalty: {
        code: 'loyalty_code_test-id'
      },
      metadata: {
        lang: 'en',
        test: true
      }
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should create event for loyalty (callback)', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/events', {
        event: 'custom event name',
        customer: {
          id: 'cust_test-id',
          source_id: 's_test-id',
          name: 'customer name'
        },
        loyalty: {
          code: 'loyalty_code_test-id'
        },
        metadata: {
          lang: 'en',
          test: true
        }
      })
      .reply(200, true)

    client.events.create('custom event name', {
      customer: {
        id: 'cust_test-id',
        source_id: 's_test-id',
        name: 'customer name'
      },
      loyalty: {
        code: 'loyalty_code_test-id'
      },
      metadata: {
        lang: 'en',
        test: true
      }
    }, function (err) {
      expect(err).to.be.null
      server.done()
      done()
    })
  })

  it('should create event for referral', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/events', {
        event: 'custom event name',
        customer: {
          id: 'cust_test-id',
          source_id: 's_test-id',
          name: 'customer name'
        },
        referral: {
          code: 'referral_code_test-id'
        },
        metadata: {
          lang: 'en',
          test: true
        }
      })
      .reply(200, true)

    client.events.create('custom event name', {
      customer: {
        id: 'cust_test-id',
        source_id: 's_test-id',
        name: 'customer name'
      },
      referral: {
        code: 'referral_code_test-id'
      },
      metadata: {
        lang: 'en',
        test: true
      }
    })
      .then(function () {
        server.done()
        done()
      })
  })

  it('should create event for referral (callback)', function (done) {
    var server = nock('https://api.voucherify.io', reqWithBody)
      .post('/v1/events', {
        event: 'custom event name',
        customer: {
          id: 'cust_test-id',
          source_id: 's_test-id',
          name: 'customer name'
        },
        referral: {
          code: 'referral_code_test-id'
        },
        metadata: {
          lang: 'en',
          test: true
        }
      })
      .reply(200, true)

    client.events.create('custom event name', {
      customer: {
        id: 'cust_test-id',
        source_id: 's_test-id',
        name: 'customer name'
      },
      referral: {
        code: 'referral_code_test-id'
      },
      metadata: {
        lang: 'en',
        test: true
      }
    }, function (err) {
      expect(err).to.be.null
      server.done()
      done()
    })
  })
})
