'use strict'

const voucherifyClient = require('../src/index')

const voucherify = voucherifyClient({
  applicationId: 'c70a6f00-cf91-4756-9df5-47628850002b',
  clientSecretKey: '3266b9f8-e246-4f79-bdf0-833929b1380c'
})

async function scrollCustomers () {
  for await (const customer of voucherify.customers.scroll({ limit: 5 })) {
    console.log('Customer', customer)
  }
}

scrollCustomers().catch((err) => console.error(err))
