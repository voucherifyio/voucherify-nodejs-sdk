'use strict'

const voucherifyClient = require('../src/index')

const voucherify = voucherifyClient({
  applicationId: 'c70a6f00-cf91-4756-9df5-47628850002b',
  clientSecretKey: '3266b9f8-e246-4f79-bdf0-833929b1380c'
})

const payload = {
  name: 'Apple iPhone 6',
  metadata: {
    type: 'normal'
  },
  attributes: [
    'attr_one',
    'attr_two'
  ]
}

let skuId = null

console.log('==== CREATE ====')
voucherify.products.create(payload)
  .then((product) => {
    console.log('New Product: ', product)

    console.log('==== READ ====')
    return voucherify.products.get(product.id)
      .then((result) => {
        console.log('Result: ', result)
      })
      .then(() => {
        console.log('==== CREATE - SKU ====')

        const sku = {
          sku: 'APPLE_IPHONE_6_BLACK'
        }

        return voucherify.products.createSku(product.id, sku)
          .then((sku) => {
            console.log('Result: ', sku)
            console.log('==== GET - SKU ====')

            return voucherify.products.getSku(product.id, sku.id)
              .then((sku) => {
                console.log('Result: ', sku)
                console.log('==== UPDATE - SKU ====')

                sku.sku = 'eur'
                sku.price = 1000

                return voucherify.products.updateSku(product.id, sku)
              })
          })
          .then((sku) => {
            console.log('Result: ', sku)

            skuId = sku.id

            return product
          })
      })
  })
  .then((product) => {
    console.log('==== UPDATE ====')

    product.metadata = product.metadata || {}
    product.metadata.type = 'premium'

    return voucherify.products.update(product)
      .then((result) => {
        console.log('Result: ', JSON.stringify(result, null, 2))
        return product
      })
  })
  .then((product) => {
    if (!skuId) {
      return product
    }

    console.log('==== DELETE - SKU ====')

    return voucherify.products.deleteSku(product.id, skuId)
      .then(() => {
        console.log('Checking...')
        return voucherify.products.getSku(product.id, skuId)
          .catch((err) => {
            console.log('Result:', err)
            return product
          })
          .then((product) => {
            skuId = null
            return product
          })
      })
  })
  .then((product) => {
    console.log('==== DELETE ====')
    return voucherify.products.delete(product.id)
      .then(() => {
        console.log('Checking...')
        return voucherify.products.get(product.id)
          .catch((err) => {
            console.log('Result:', err)
          })
      })
  })
  .catch((err) => {
    console.error('Error: ', err, err.stack)
  })
