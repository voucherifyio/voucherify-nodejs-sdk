const voucherifyClient = require('../src/index')

const voucherify = voucherifyClient({
  applicationId: 'c70a6f00-cf91-4756-9df5-47628850002b',
  clientSecretKey: '3266b9f8-e246-4f79-bdf0-833929b1380c',
  apiVersion: 'v2017-04-05'
})

voucherify.campaigns.list({
  limit: 10,
  page: 1,
  filters: {
    junction: 'AND',
    'metadata.lang': {
      conditions: {
        $is: ['en'],
        $is_not: ['es']
      }
    }
  }
}).then(function (result) {
  console.log(result)
}).catch(function (err) {
  console.error(err)
})
