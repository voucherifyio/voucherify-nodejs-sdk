'use strict'

const packageJson = require('../package')
const channelHeader = `Node.js-${process.version}-SDK-v${packageJson.version}`

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
