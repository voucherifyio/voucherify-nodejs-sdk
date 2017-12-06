'use strict'

// FIXME leaving var to satisfy tests for node v0.10 and v0.12
var packageJson = require('../package')
var channelHeader = 'Node.js-' + process.version + '-SDK-v' + packageJson.version

module.exports = {
  reqWithBody: {
    reqheaders: {
      'X-App-Id': 'node-sdk-test-id',
      'X-App-Token': 'node-sdk-test-secret',
      'X-Voucherify-Channel': channelHeader,
      'accept': 'application/json',
      'content-type': 'application/json'
    }
  },
  reqWithoutBody: {
    reqheaders: {
      'X-App-Id': 'node-sdk-test-id',
      'X-App-Token': 'node-sdk-test-secret',
      'X-Voucherify-Channel': channelHeader,
      'accept': 'application/json'
    }
  }
}
