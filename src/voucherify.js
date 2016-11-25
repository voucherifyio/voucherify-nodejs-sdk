'use strict'

const ApiClient = require('./ApiClient')
const Campaigns = require('./Campaigns')
const Vouchers = require('./Vouchers')
const Validations = require('./Validations')
const Redemptions = require('./Redemptions')
const Customers = require('./Customers')

const {
  assertOption,
  encode
} = require('./helpers')

module.exports = function (options) {
  assertOption(options, 'applicationId')
  assertOption(options, 'clientSecretKey')

  const client = new ApiClient(options)
  const vouchers = new Vouchers(client)
  const campaigns = new Campaigns(client)
  const validations = new Validations(client)
  const redemptions = new Redemptions(client)
  const customers = new Customers(client)

  return {
    vouchers,
    campaigns,
    validations,
    redemptions,
    customers,

    // leaving for backward compatibility
    list: (query, callback) => vouchers.list(query, callback),
    get: (code, callback) => vouchers.get(code, callback),
    create: (voucher, callback) => vouchers.create(voucher, callback),
    delete: (code, params, callback) => vouchers.delete(code, params, callback),
    update: (voucher, callback) => vouchers.update(voucher, callback),
    enable: (code, callback) => vouchers.enable(code, callback),
    disable: (code, callback) => vouchers.disable(code, callback),
    publish: (campaignName, callback) => vouchers.publish(campaignName, callback),

    validate: (code, context, callback) => validations.validateVoucher(code, context, callback),

    redemption: (code, callback) => redemptions.getForVoucher(code, callback),
    // FIXME handle previous methods, copy and extend `list` function prototype
    // redemptions: (query, callback) => redemptions.list(query, callback),
    redeem: (code, trackingId, callback) => redemptions.redeem(code, trackingId, callback),
    rollback: (redemptionId, data, callback) => redemptions.rollback(redemptionId, data, callback),

    campaign: {
      voucher: {
        create: (campaignName, voucher, callback) => campaigns.addVoucher(campaignName, voucher, callback)
      }
    },

    customer: customers,

    product: {
      create: (product, callback) => {
        return client.post('/products', product, callback)
      },

      get: (productId, callback) => {
        return client.get(`/products/${encode(productId)}`, null, callback)
      },

      update: (product, callback) => {
        return client.put(`/products/${encode(product.id)}`, product, callback)
      },

      delete: (productId, callback) => {
        return client.delete(`/products/${encode(productId)}`, callback)
      },

      sku: {
        create: (productId, sku, callback) => {
          return client.post(`/products/${encode(productId)}/skus`, sku, callback)
        },

        get: (productId, skuId, callback) => {
          return client.get(
            `/products/${encode(productId)}/skus/${encode(skuId)}`,
            null, callback
          )
        },

        update: (productId, sku, callback) => {
          return client.put(
            `/products/${encode(productId)}/skus/${encode(sku.id)}`,
            sku, callback
          )
        },

        delete: (productId, skuId, callback) => {
          return client.delete(
            `/products/${encode(productId)}/skus/${encode(skuId)}`,
            callback
          )
        }
      }
    }
  }
}
