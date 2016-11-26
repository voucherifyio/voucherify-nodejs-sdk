module.exports = {
  reqWithBody: {
    reqheaders: {
      'X-App-Id': 'node-sdk-test-id',
      'X-App-Token': 'node-sdk-test-secret',
      'X-Voucherify-Channel': 'Node.js-SDK',
      'accept': 'application/json',
      'content-type': 'application/json'
    }
  },
  reqWithoutBody: {
    reqheaders: {
      'X-App-Id': 'node-sdk-test-id',
      'X-App-Token': 'node-sdk-test-secret',
      'X-Voucherify-Channel': 'Node.js-SDK',
      'accept': 'application/json'
    }
  }
}
