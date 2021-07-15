'use strict'

const ApiClient = require('./ApiClient')
const AsyncActions = require('./AsyncActions');
const Balance = require('./Balance')
const Campaigns = require('./Campaigns')
const Consents = require('./Consents')
const Customers = require('./Customers')
const Distributions = require('./Distributions')
const Events = require('./Events')
const Exports = require('./Exports')
const Loyalties = require('./Loyalties')
const Orders = require('./Orders')
const Products = require('./Products')
const Promotions = require('./Promotions')
const PromotionTiers = require('./PromotionTiers')
const Redemptions = require('./Redemptions')
const Rewards = require('./Rewards')
const Segments = require('./Segments')
const ValidationRules = require('./ValidationRules')
const Validations = require('./Validations')
const Vouchers = require('./Vouchers')
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
  const asyncActions = new AsyncActions(client)

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
    events,
    asyncActions
  }
}
