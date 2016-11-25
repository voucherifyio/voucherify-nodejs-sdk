'use strict'

const ApiClient = require('./ApiClient')
const Campaigns = require('./Campaigns')
const Vouchers = require('./Vouchers')
const Validations = require('./Validations')
const Redemptions = require('./Redemptions')
const Customers = require('./Customers')
const Products = require('./Products')
const {assertOption} = require('./helpers')

module.exports = function (options) {
  assertOption(options, 'applicationId')
  assertOption(options, 'clientSecretKey')

  const client = new ApiClient(options)
  const vouchers = new Vouchers(client)
  const campaigns = new Campaigns(client)
  const validations = new Validations(client)
  const redemptions = new Redemptions(client)
  const customers = new Customers(client)
  const products = new Products(client)

  return {
    vouchers,
    campaigns,
    validations,
    redemptions,
    customers,
    products,

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
      create: (product, callback) => products.create(product, callback),
      get: (productId, callback) => products.get(productId, callback),
      update: (product, callback) => products.update(product, callback),
      delete: (productId, callback) => products.delete(productId),
      sku: {
        create: (productId, sku, callback) => products.createSku(productId, sku, callback),
        get: (productId, skuId, callback) => products.getSku(productId, skuId, callback),
        update: (productId, sku, callback) => products.updateSku(productId, sku, callback),
        delete: (productId, skuId, callback) => products.deleteSku(productId, skuId, callback)
      }
    }
  }
}
