'use strict'

const voucherifyClient = require('../src/index')

const voucherify = voucherifyClient({
  applicationId: 'c70a6f00-cf91-4756-9df5-47628850002b',
  clientSecretKey: '3266b9f8-e246-4f79-bdf0-833929b1380c'
})

const payload = {
  name: 'John Doe',
  email: 'email@example.com',
  description: 'Premium user, ACME Inc.',
  metadata: {
    lang: 'en'
  }
}

console.log('==== CREATE ====')
voucherify.customers.create(payload)
  .then((customer) => {
    console.log('New Customer: ', customer)

    console.log('==== READ ====')
    return voucherify.customers.get(customer.id)
      .then((result) => {
        console.log('Result: ', result)
        return customer
      })
  })
  .then((customer) => {
    console.log('==== UPDATE ====')

    customer.metadata.type = 'premium'

    return voucherify.customers.update(customer)
      .then((result) => {
        console.log('Result: ', result)
        return customer
      })
  })
  .then((customer) => {
    console.log('==== DELETE ====')
    return voucherify.customers.delete(customer.id)
      .then(() => {
        console.log('Checking...')
        return voucherify.customers.get(customer.id)
          .catch((err) => {
            console.log('Result:', err)
          })
      })
  })
  .catch((err) => {
    console.error('Error: ', err, err.stack)
  })
