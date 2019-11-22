const voucherifyClient = require('../src/index')

const voucherify = voucherifyClient({
  applicationId: 'c70a6f00-cf91-4756-9df5-47628850002b',
  clientSecretKey: '3266b9f8-e246-4f79-bdf0-833929b1380c'
})

let voucherCode

voucherify.vouchers.create({
  type: 'GIFT_VOUCHER',
  gift: {
    amount: 10000
  },
  category: 'Node SDK Test',
  start_date: '2016-01-01T00:00:00Z',
  expiration_date: '2016-12-31T23:59:59Z'
})
  .then(function (result) {
    console.log('Voucher %s created. Redeeming...', result.code)
    voucherCode = result.code
    return voucherify.redemptions.redeem({ voucher: result.code, order: { amount: 5000 } }, 'tester')
  })
  .then(function (result) {
    console.log('Voucher %s redeemed. Redemption id: %s, Rolling back...', result.voucher.code, result.id)
    return voucherify.redemptions.rollback(result.id, 'just so', 'tester')
  })
  .then(function (result) {
    console.log('Redemption %s rolled back. Rollback id: %s', result.redemption, result.id)
    console.log(JSON.stringify(result, null, 4))
    return voucherify.vouchers.delete(voucherCode, { force: true })
  })
  .then(function (result) {
    console.log('Voucher %s deleted. Result: %j', voucherCode, result)
  })
  .catch(function (error) {
    console.error('Error: %s', error)
  })
