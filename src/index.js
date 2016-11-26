'use strict'

const ApiClient = require('./ApiClient')
const Campaigns = require('./Campaigns')
const Vouchers = require('./Vouchers')
const Validations = require('./Validations')
const Redemptions = require('./Redemptions')
const Customers = require('./Customers')
const Products = require('./Products')
const {assertOption, isFunction} = require('./helpers')

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

  /**
   * Copy redemptions.list method and extend it so we can run:
   *
   *   // deprecated
   *   api.redemptions(query, callback)
   *
   *   // new
   *   api.redemptions.list(query, callback)
   *   api.redemptions.redeem(code, trackingId, callback)
   *   // ...
   */
  const backwardCompatibleRedemptions = redemptions.list.bind(redemptions)
  // copy to func object all redemption methods bound to it's context
  const exposedFunctions = Object.getOwnPropertyNames(Object.getPrototypeOf(redemptions))

  for (const name of exposedFunctions) {
    if (name !== 'constructor' && isFunction(redemptions[name])) {
      backwardCompatibleRedemptions[name] = redemptions[name].bind(redemptions)
    }
  }

  return {
    vouchers,
    campaigns,
    validations,
    redemptions: backwardCompatibleRedemptions,
    customers,
    products,

    // leaving for backward compatibility

    // vouchers
    list: (query, callback) => vouchers.list(query, callback),
    get: (code, callback) => vouchers.get(code, callback),
    create: (voucher, callback) => vouchers.create(voucher, callback),
    delete: (code, params, callback) => vouchers.delete(code, params, callback),
    update: (voucher, callback) => vouchers.update(voucher, callback),
    enable: (code, callback) => vouchers.enable(code, callback),
    disable: (code, callback) => vouchers.disable(code, callback),
    publish: (campaignName, callback) => vouchers.publish(campaignName, callback),
    // validations
    validate: (code, context, callback) => validations.validateVoucher(code, context, callback),
    // redemptions
    redemption: (code, callback) => redemptions.getForVoucher(code, callback),
    redeem: (code, trackingId, callback) => redemptions.redeem(code, trackingId, callback),
    rollback: (redemptionId, data, callback) => redemptions.rollback(redemptionId, data, callback),
    // campaigns
    campaign: {
      voucher: {
        create: (campaignName, voucher, callback) => campaigns.addVoucher(campaignName, voucher, callback)
      }
    },
    // customers
    customer: customers,
    // products
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
