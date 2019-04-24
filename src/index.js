'use strict'

const ApiClient = require('./ApiClient')
const Campaigns = require('./Campaigns')
const Distributions = require('./Distributions')
const Exports = require('./Exports')
const Events = require('./Events')
const Balance = require('./Balance')
const Vouchers = require('./Vouchers')
const Validations = require('./Validations')
const Redemptions = require('./Redemptions')
const PromotionTiers = require('./PromotionTiers')
const Promotions = require('./Promotions')
const Customers = require('./Customers')
const Orders = require('./Orders')
const Products = require('./Products')
const Rewards = require('./Rewards')
const ValidationRules = require('./ValidationRules')
const Segments = require('./Segments')
const {assertOption, isFunction} = require('./helpers')

module.exports = function (options) {
  assertOption(options, 'applicationId')
  assertOption(options, 'clientSecretKey')

  const client = new ApiClient(options)
  const balance = new Balance(client)
  const vouchers = new Vouchers(client, balance)
  const campaigns = new Campaigns(client)
  const exportsNamespace = new Exports(client)
  const events = new Events(client)
  const distributions = new Distributions(client, exportsNamespace)
  const promotionTiers = new PromotionTiers(client)
  const promotions = new Promotions(client, campaigns, promotionTiers)
  const validations = new Validations(client, promotions)
  const redemptions = new Redemptions(client, promotions)
  const customers = new Customers(client)
  const orders = new Orders(client)
  const products = new Products(client)
  const rewards = new Rewards(client)
  const segments = new Segments(client)
  const validationRules = new ValidationRules(client)

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
    distributions,
    validations,
    redemptions: backwardCompatibleRedemptions,
    promotions,
    customers,
    orders,
    products,
    rewards,
    segments,
    validationRules,
    events,

    // leaving for backward compatibility

    // vouchers
    list: (query, callback) => vouchers.list(query, callback),
    get: (code, callback) => vouchers.get(code, callback),
    create: (voucher, callback) => vouchers.create(voucher, callback),
    delete: (code, params, callback) => vouchers.delete(code, params, callback),
    update: (voucher, callback) => vouchers.update(voucher, callback),
    enable: (code, callback) => vouchers.enable(code, callback),
    disable: (code, callback) => vouchers.disable(code, callback),
    publish: (campaignName, callback) => distributions.publish(campaignName, callback),
    // validations
    validate: (code, params, callback) => validations.validateVoucher(code, params, callback),
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
