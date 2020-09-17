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
const Consents = require('./Consents')
const Orders = require('./Orders')
const Products = require('./Products')
const Rewards = require('./Rewards')
const Loyalties = require('./Loyalties')
const ValidationRules = require('./ValidationRules')
const Segments = require('./Segments')
const { assertOption } = require('./helpers')

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
  const consents = new Consents(client)
  const orders = new Orders(client)
  const products = new Products(client)
  const rewards = new Rewards(client)
  const loyalties = new Loyalties(client)
  const segments = new Segments(client)
  const validationRules = new ValidationRules(client)

  return {
    vouchers,
    campaigns,
    distributions,
    validations,
    redemptions,
    promotions,
    customers,
    consents,
    orders,
    products,
    rewards,
    loyalties,
    segments,
    validationRules,
    events
  }
}
