<p align="center" >
  <img src="./voucherify-nodejs-sdk.png" />
</p>

<h3 align="center">Official <a href="http://voucherify.io?utm_source=github&utm_medium=sdk&utm_campaign=acq">Voucherify</a> SDK for Node.js</h3>

<p align="center">
  <a href="http://standardjs.com/"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="JavaScript Style Guide" /></a>
  <a href="https://travis-ci.org/voucherifyio/voucherify-nodejs-sdk"><img src="https://travis-ci.org/voucherifyio/voucherify-nodejs-sdk.svg?branch=master" alt="Build Status"/></a>
  <a href="https://www.npmjs.com/package/voucherify"><img src="https://img.shields.io/npm/v/voucherify.svg" alt="NPM Version"/></a>
  <a href="https://www.npmjs.com/package/voucherify"><img src="https://img.shields.io/npm/dm/voucherify.svg" alt="NPM Downloads"/></a>
  <a href="https://www.npmjs.com/package/voucherify"><img src="https://david-dm.org/voucherifyio/voucherify-nodejs-sdk.svg" alt="Dependencies"/></a>
</p>
<hr />

<p align="center">
<b><a href="#migration-to-2x">Migration to 2.x</a></b>
<b><a href="#migration-to-4x">Migration to 4.x</a></b>
|
<b><a href="#setup">Setup</a></b>
|
<b><a href="#callback-or-promise">Callback or Promise?</a></b>
|
<b><a href="#error-handling">Error handling</a></b>
|
<b><a href="#contributing">Contributing</a></b>
|
<b><a href="#changelog">Changelog</a></b>
</p>

<p align="center">
API:
<a href="#vouchers-api">Vouchers</a>
|
<a href="#campaigns-api">Campaigns</a>
|
<a href="#distributions-api">Distributions</a>
|
<a href="#validations-api">Validations</a>
|
<a href="#redemptions-api">Redemptions</a>
|
<a href="#customers-api">Customers</a>
|
<a href="#consents-api">Consents</a>
|
<a href="#orders-api">Orders</a>
|
<a href="#products-api">Products</a>
|
<a href="#rewards-api">Rewards</a>
|
<a href="#loyalties-api">Loyalties</a>
|
<a href="#segments-api">Segments</a>
|
<a href="#validation-rules-api">Validation Rules</a>
|
<a href="#promotions-api">Promotions</a>
|
<a href="#events-api">Events</a>
|
<a href="#utils">Utils</a>
</p>

---

## Setup

`npm install voucherify --save`

[Log-in](http://app.voucherify.io/?utm_source=github&utm_medium=sdk&utm_campaign=acq#/login) to Voucherify web interface and obtain your Application Keys from [Configuration](https://app.voucherify.io/?utm_source=github&utm_medium=sdk&utm_campaign=acq#/app/configuration):

```javascript
const voucherifyClient = require('voucherify')

const client = voucherifyClient({
    applicationId: 'YOUR-APPLICATION-ID',
    clientSecretKey: 'YOUR-CLIENT-SECRET-KEY'
})
```

Optionally, you can add `apiVersion` to the client options if you want to use a [specific API version](http://docs.voucherify.io/docs/api-version-upgrades?utm_source=github&utm_medium=sdk&utm_campaign=acq).

```javascript
const client = voucherifyClient({
    applicationId: 'YOUR-APPLICATION-ID',
    clientSecretKey: 'YOUR-CLIENT-SECRET-KEY',
    apiVersion: 'v2017-04-20'
})
```

### API Endpoint

Optionally, you can add `apiUrl` to the client options if you want to use Voucherify running in a specific region.

```javascript
const client = voucherifyClient({
    applicationId: 'YOUR-APPLICATION-ID',
    clientSecretKey: 'YOUR-CLIENT-SECRET-KEY',
    apiUrl: 'https://<region>.api.voucherify.io'
})
```

## Callback or Promise?

All methods in the SDK provide both callback based as well as promise based interactions.
If you want to use callback just pass it as a last parameter. For example:

```javascript
client.vouchers.get('v1GiJYuuS', (error, result) => {
    if (error) {
        // handle error
        return
    }

    // do the work
})
```

If you prefer to use promises then the code goes like this:

```javascript
client.vouchers.get('v1GiJYuuS')
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.error("Error: %s", error)
    })
```

All other examples in the readme use promises but they could be as well written with callbacks.

## API

This SDK is fully consistent with restful API Voucherify provides.
You will find detailed description and example responses at [official docs](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq).
Method headers point to more detailed descriptions of params you can use.

### Vouchers API
Methods are provided within `client.vouchers.*` namespace.
- [Create Voucher](#create-voucher)
- [Get Voucher](#get-voucher)
- [Update Voucher](#update-voucher)
- [Delete Voucher](#delete-voucher)
- [Add Gift Voucher Balance](#add-gift-voucher-balance)
- [List Vouchers](#list-vouchers)
- [Enable Voucher](#enable-voucher)
- [Disable Voucher](#disable-voucher)
- [Import Vouchers](#import-vouchers)
- [Examine Vouchers Qualification](#examine-vouchers-qualification)

#### [Create Voucher]
```javascript
client.vouchers.create(voucher)
```
Check [voucher object](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-voucher-object).

#### [Get Voucher]
```javascript
client.vouchers.get(code)
```
#### [Update Voucher]
```javascript
client.vouchers.update(voucher)
```
#### [Delete Voucher]
```javascript
client.vouchers.delete(code)
client.vouchers.delete(code, {force: true})
```
#### [List Vouchers]
```javascript
client.vouchers.list()
client.vouchers.list(params)
```
#### [Enable Voucher]
```javascript
client.vouchers.enable()
client.vouchers.enable(code)
```
#### [Disable Voucher]
```javascript
client.vouchers.disable()
client.vouchers.disable(code)
```
#### [Import Vouchers]
```javascript
client.vouchers.import(vouchers)
```
#### [Add Gift Voucher Balance]
```javascript
client.vouchers.balance.create(code, {amount})
```
#### [Examine Vouchers Qualification]
```javascript
client.vouchers.qualifications.examine(bodyParams)
client.vouchers.qualifications.examine(bodyParams, queryParams)
// Example
client.vouchers.qualifications.examine({}, {audienceRulesOnly: true, limit: 10})
```
---

### Campaigns API
Methods are provided within `client.campaigns.*` namespace.
- [Create Campaign](#create-campaign)
- [Update Campaign](#update-campaign)
- [Get Campaign](#get-campaign)
- [Add Voucher to Campaign](#add-voucher-to-campaign)
- [Import Vouchers to Campaign](#import-vouchers-to-campaign)
- [List Campaigns](#list-campaigns)
- [Examine Campaigns Qualification](#examine-campaigns-qualification)

#### [Create Campaign]
```javascript
client.campaigns.create(campaign)
```
#### [Update Campaign]
Method will update only fields passed to `campaign` argument.
```javascript
client.campaigns.update(campaignId, campaign)
client.campaigns.update(campaignName, campaign)
```
#### [Delete Campaign]
```javascript
client.campaigns.delete(campaignName)
client.campaigns.delete(campaignName, {force: true})
```
#### [Get Campaign]
```javascript
client.campaigns.get(name)
```
#### [Add Voucher to Campaign]
```javascript
client.campaigns.addVoucher(campaignName)
client.campaigns.addVoucher(campaignName, params)
```
#### [Import Vouchers to Campaign]
```javascript
client.campaigns.importVouchers(campaignName, vouchers, callback)
```
#### [List Campaigns]
Since API version: `v2017-04-20`.

```javascript
client.campaigns.list()
client.campaigns.list(params)
```
#### [Examine Campaigns Qualification]
```javascript
client.campaigns.qualifications.examine(bodyParams)
client.campaigns.qualifications.examine(bodyParams, queryParams)
// Example
client.campaigns.qualifications.examine({}, {audienceRulesOnly: true, limit: 10})
```
---

### Distributions API
Methods are provided within `client.distributions.*` namespace.

- [Publish Voucher](#publish-voucher)
- [Create Export](#create-export)
- [Get Export](#get-export)
- [Delete Export](#delete-export)
- [List publications](#list-publications)
- [Create publication](#create-publication)

#### [Publish Voucher]
```javascript
client.distributions.publish(params)
```
#### [Create Export]
```javascript
client.distributions.exports.create(exportObject)
```
Check [the export object](https://docs.voucherify.io/v1/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-export-object).
#### [Get Export]
```javascript
client.distributions.exports.get(exportId)
```
#### [Delete Export]
```javascript
client.distributions.exports.delete(exportId)
```
#### [List publications]
```javascript
client.distributions.publications.list()
client.distributions.publications.list(params)
```
#### [Create publication]
```javascript
client.distributions.publications.create(params)
```

---

### Validations API
Methods are provided within `client.validations.*` namespace.

- [Validate Voucher](#validate-voucher)
- [Validate Promotion Campaign](#validate-promotion-campaign)

#### [Validate Voucher]
```javascript
client.validations.validateVoucher(code)
client.validations.validateVoucher(code, params)

// or

client.validations.validate(code)
client.validations.validate(code, params)
```
#### [Validate Promotion Campaign](#validate-promotion-campaign)
```javascript
client.validations.validate(params)
```

---

### Redemptions API
Methods are provided within `client.redemptions.*` namespace.

- [Redeem Voucher](#redeem-voucher)
- [Redeem Promotion's Tier](#redeem-promotions-tier)
- [Redeem Loyalty Card](#redeem-loyalty-card)
- [List Redemptions](#list-redemptions)
- [Get Voucher's Redemptions](#get-vouchers-redemptions)
- [Rollback Redemption](#rollback-redemption)

#### [Redeem Voucher]
```javascript
client.redemptions.redeem(code)
client.redemptions.redeem(code, params)

// Deprecated!
client.redemptions.redeem({code, ...params})
client.redemptions.redeem({code, ...params}, tracking_id)
client.redemptions.redeem(code, tracking_id) // use: client.redemptions.redeem(code, {customer: {source_id}})
```
#### [Redeem Loyalty Card]
```javascript
client.redemptions.redeem(loyaltyCardId, params)
```
#### [List Redemptions]
```javascript
client.redemptions.list()
client.redemptions.list(params)
```
#### [Get Voucher's Redemptions]
```javascript
client.redemptions.getForVoucher(code)
```
#### [Rollback Redemption]
```javascript
client.redemptions.rollback(redemptionId)
client.redemptions.rollback(redemptionId, params)
client.redemptions.rollback(redemptionId, reason)
```
Check [redemption rollback object](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-redemption-rollback-object).

---

### Promotions API
Methods are provided within `client.promotions.*` namespace.

- [Create Promotion Campaign](#create-promotion-campaign)
- [Validate Promotion Campaign](#validate-promotion-campaign)
- [List Promotion's Tiers](#list-promotions-tiers)
- [Create Promotion's Tier](#create-promotions-tier)
- [Redeem Promotion's Tier](#redeem-promotions-tier)
- [Update Promotion's Tier](#update-promotions-tier)
- [Delete Promotion's Tier](#delete-promotions-tier)

Check [promotion campaign object](http://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-promotion-campaign).
#### [Create Promotion Campaign]
```javascript
client.promotions.create(promotionCampaign)
```
#### [Validate Promotion Campaign]
```javascript
client.promotions.validate(validationContext)
```
#### [List Promotion's Tiers]
```javascript
client.promotions.tiers.list(promotionCampaignId)
```
Check [promotion's tier object](http://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-promotion-object)
#### [Create Promotion's Tier]
```javascript
client.promotions.tiers.create(promotionId, promotionsTier)
```
#### [Redeem Promotion's Tier]
```javascript
client.promotions.tiers.redeem(promotionsTierId, redemptionContext)
```
#### [Update Promotion's Tier]
```javascript
client.promotions.tiers.update(promotionsTier)
```
#### [Delete Promotion's Tier]
```javascript
client.promotions.tiers.delete(promotionsTierId)
```

---

### Customers API
Methods are provided within `client.customers.*` namespace.

- [Create Customer](#create-customer)
- [Get Customer](#get-customer)
- [Update Customer](#update-customer)
- [Delete Customer](#delete-customer)
- [List Customers](#list-customers)
- [Update Customer's Consents](#update-customers-consents)

#### [Create Customer]
```javascript
client.customers.create(customer)
```
Check [customer object](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-customer-object).
#### [Get Customer]
```javascript
client.customers.get(customerId)
```
#### [Update Customer]
`customer` object must contain `id` or `source_id`.

```javascript
client.customers.update(customer)
```
#### [Delete Customer]
```javascript
client.customers.delete(customerId)
```
#### [List Customers]
```javascript
client.customers.list()
client.customers.list(params)
```
#### [Scroll through customers]
Standard list customers API has limitation of available pages to be shown equal to 100.
To cover cases when you would like to fetch more, you must use scroll capabilities.

```javascript
async function () {
  for await (const customer of client.customers.scroll(params)) {
    console.log('Customer', customer)
  }
}
```
`params` argument is consistent with `list` method.
Keep in mind `scroll` doesn't support callback version.

You can optionally define scrolling cursor based on customer creation date using property `starting_after`.
By default returned customers are in descending order, if you want to change it to ascending define `order` equal to `create_at`.

```javascript
async function () {
  for await (const customer of client.customers.scroll({
    starting_after: "2020-01-01", // optional
    order: "create_at" // optional (by default order is "-create_at" which corresponds to descending).
    ...params})
  ) {
    console.log('Customer', customer)
  }
}
```

Keep in mind this operation may drain your API call limits fairly quickly.
In the hood it fetches customers in max possible batches of 100.
So in example if you have 100'000 customers scroll over all of them, you will use 1000 API calls.

#### [Update Customer's Consents]
```javascript
client.customers.updateConsents(customer, consents)
```

---

### Consents API
Methods are provided within `client.consents.*` namespace.

- [List Customers](#list-customers)

You can [update Customer's consents](#update-customers-consents) in Customer namespace.

#### [List Consents]
```javascript
client.consents.list()
```

---

### Orders API
Methods are provided within `client.orders.*` namespace.

- [Create Order](#create-order)
- [Get Order](#get-order)
- [Update Order](#update-order)
- [List Orders](#list-orders)

#### [Create Order]
```javascript
client.orders.create(order)
```
Check [the order object](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-order-object).
#### [Get Order]
```javascript
client.orders.get(orderId)
```
#### [Update Order]
```javascript
client.orders.update(order)
```
#### [List Orders]
```javascript
client.orders.list()
client.orders.list(params)
```

---

### Products API
Methods are provided within `client.products.*` namespace.

- [Create Product](#create-product)
- [Get Product](#get-product)
- [Update Product](#update-product)
- [Bulk Update Products](#bulk-update-products)
- [Delete Product](#delete-product)
- [List Products](#list-products)
- [Create SKU](#create-sku)
- [Get SKU](#get-sku)
- [Update SKU](#update-sku)
- [Delete SKU](#delete-sku)
- [List all product SKUs](#list-all-product-skus)

#### [Create Product]
```javascript
client.products.create(product)
```
Check [product object](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-product-object).
#### [Get Product]
```javascript
client.products.get(productId)
```
#### [Update Product]
```javascript
client.products.update(product)
```
#### [Bulk Update Products]
```javascript
client.products.bulkUpdate(products)
```
#### [Delete Product]
```javascript
client.products.delete(productId)
client.products.delete(productId, {force: true})
```
#### [List Products]
```javascript
client.products.list()
client.products.list(params)
```
#### [Create SKU]
```javascript
client.products.createSku(productId, sku)
```
Check [SKU object](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-sku-object).
#### [Get SKU]
```javascript
client.products.getSku(productId, skuId)
```
#### [Update SKU]
```javascript
client.products.updateSku(productId, sku)
```
#### [Delete SKU]
```javascript
client.products.deleteSku(productId, skuId)
client.products.deleteSku(productId, skuId, {force: true})
```
#### [List all product SKUs]
```javascript
client.products.listSkus(productId)
```

---

### Rewards API
Methods are provided within `client.rewards.*` namespace.

- [Create Reward](#create-reward)
- [Get Reward](#get-reward)
- [Update Reward](#update-reward)
- [Delete Reward](#delete-reward)
- [List Rewards](#list-rewards)
- [Create Reward Assignment](#create-reward-assignment)
- [Update Reward Assignment](#update-reward-assignment)
- [Delete Reward Assignment](#delete-reward-assignment)
- [List Reward Assignments](#list-reward-assignments)

#### [Create Reward]
```javascript
client.rewards.create(reward)
```
Check [reward object](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-reward-object).
#### [Get Reward]
```javascript
client.rewards.get(rewardId)
```
#### [Update Reward]
```javascript
client.rewards.update(reward)
```
#### [Delete Reward]
```javascript
client.rewards.delete(rewardId)
```
#### [List Rewards]
```javascript
client.rewards.list()
client.rewards.list(params)
```
#### [Create Reward Assignment]
```javascript
client.rewards.createAssignment(rewardId, assignment)
```
Check [reward assignment object](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-reward-assignment-object).
#### [Update Reward Assignment]
```javascript
client.rewards.updateAssignment(rewardId, assignment)
```
#### [Delete Reward Assignment]
```javascript
client.rewards.deleteAssignment(rewardId, assignmentId)
```
#### [List Reward Assignments]
```javascript
client.rewards.listAssignments(rewardId)
client.rewards.listAssignments(rewardId, params)
```

---

### Loyalties API
Methods are provided within `client.loyalties.*` namespace.

- [Create Loyalty](#create-loyalty-program)
- [Get Loyalty](#get-loyalty-program)
- [Update Loyalty](#update-loyalty-program)
- [Delete Loyalty](#delete-loyalty-program)
- [List Loyalties](#list-loyalty-programs)
- [Create Loyalty Reward Assignment](#create-loyalty-reward-assignment)
- [Update Loyalty Reward Assignment](#update-loyalty-reward-assignment)
- [Delete Loyalty Reward Assignment](#delete-loyalty-reward-assignment)
- [List Loyalty Reward Assignments](#list-loyalty-reward-assignments)
- [Create Loyalty Earning Rules](#create-loyalty-earning-rules)
- [Update Loyalty Earning Rule](#update-loyalty-earning-rule)
- [Delete Loyalty Earning Rule](#delete-loyalty-earning-rule)
- [List Loyalty Earning Rules](#list-loyalty-earning-rules)
- [Create Loyalty Member](#create-loyalty-member)
- [Get Loyalty Member](#get-loyalty-member)
- [List Loyalty Members](#list-loyalty-members)
- [Get Member Activites](#get-member-activities)
- [Add Points](#add-loyalty-card-balance)
- [Redeem reward](#redeem-loyalty-card)

#### [Create Loyalty]
```javascript
client.loyalties.create(campaign)
```
#### [Get Loyalty]
```javascript
client.loyalties.get(campaignId)
```
#### [Update Loyalty]
```javascript
client.loyalties.update(campaign)
```
#### [Delete Loyalty]
```javascript
client.loyalties.delete(campaignId)
```
#### [List Loyalties]
```javascript
client.loyalties.list()
client.loyalties.list(params)
```
#### [Create Loyalty Reward Assignment]
```javascript
client.loyalties.createRewardAssignments(campaignId, assignment)
```
#### [Update Loyalty Reward Assignment]
```javascript
client.loyalties.updateRewardAssignment(campaignId, assignment)
```
#### [Delete Loyalty Reward Assignment]
```javascript
client.loyalties.deleteRewardAssignment(campaignId, assignmentId)
```
#### [List Loyalty Reward Assignments]
```javascript
client.loyalties.listRewardAssignments(campaignId)
client.loyalties.listRewardAssignments(campaignId, params)
```
#### [Create Loyalty Earning Rules]
```javascript
client.loyalties.createEarningRule(campaignId, earningRules)
```
#### [Update Loyalty Earning Rule]
```javascript
client.loyalties.updateEarningRule(campaignId, earningRule)
```
#### [Delete Loyalty Earning Rule]
```javascript
client.loyalties.deleteEarningRule(campaignId, earningRuleId)
```
#### [List Loyalty Earning Rules]
```javascript
client.loyalties.listEarningRules(campaignId)
client.loyalties.listEarningRules(campaignId, params)
```
#### [Create Loyalty Member]
```javascript
client.loyalties.createMember(campaignId, member)
```
#### [Get Loyalty Member]
```javascript
client.loyalties.getMember(campaignId, memberId)
```
#### [List Loyalty Members]
```javascript
client.loyalties.listMembers(campaignId)
client.loyalties.listMembers(campaignId, params)
```
#### [Get Member Activities]
```javascript
client.loyalties.getMemberActivities(campaignId, memberId)
```
#### [Add Loyalty Card Balance]
```javascript
client.loyalties.addPoints(campaignId, memberId, balance)
```
#### [Redeem Loyalty Card]
```javascript
client.loyalties.redeemReward(campaignId, memberId, reward)
```

---

### Segments API
Methods are provided within `client.segments.*` namespace.

- [Create Segment](#create-segment)
- [Get Segment](#get-segment)
- [Delete Segment](#delete-segment)

#### [Create Segment]
```javascript
client.segments.create(segment)
```
Check [the segment object](https://docs.voucherify.io/v1/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-segment-object).
#### [Get Segment]
```javascript
client.segments.get(segmentId)
```
#### [Delete Segment]
```javascript
client.segments.delete(segmentId)
```

---

### Validation Rules API
Methods are provided within `client.validationRules.*` namespace.

- [Create Rule](#create-validation-rule)
- [Get Rule](#get-validation-rule)
- [Update Rule](#update-validation-rule)
- [Delete Rule](#delete-validation-rule)
- [Create Rule Assignment](#create-rule-assignment)
- [Delete Rule Assignment](#delete-rule-assignment)
- [List Rules](#list-rules)
- [List Rule Assignments](#list-rule-assignments)
- [Validate Validation Rule](#validate-validation-rule)

#### [Create Validation Rule]
```javascript
client.validationRules.create(validationRule)
```
Check [validation rule object](https://docs.voucherify.io/v1/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-validation-rule-object).
#### [Get Validation Rule]
```javascript
client.validationRules.get(validationRuleId)
```
#### [Update Validation Rule]
```javascript
client.validationRules.update(validationRule)
```
#### [Delete Validation Rule]
```javascript
client.validationRules.delete(validationRuleId)
```
#### [Create Rule Assignment]
```javascript
client.validationRules.createAssignment(validationRuleId, assignment)
```
#### [Delete Rule Assignment]
```javascript
client.validationRules.deleteAssignment(validationRuleId, assignmentId)
```
#### [List Rules]
```javascript
client.validationRules.list()
client.validationRules.list(params)
```
#### [List Rule Assignments]
```javascript
client.validationRules.listAssignments(validationRuleId)
client.validationRules.listAssignments(validationRuleId, params)
```
#### [Validate Validation Rule]
```javascript
client.validationRules.validate(validationRuleId)
client.validationRules.validate(validationRuleId, params)
```
---

### Events API
Methods are provided within `client.events.*` namespace.

- [Create Event](#create-custom-event)

#### [Create event]
Check [customer object](https://docs.voucherify.io/v1/reference#the-customer-object).
```javascript
client.events.create(eventName, { customer })
client.events.create(eventName, { customer, metadata })
client.events.create(eventName, { customer, referral, metadata })
client.events.create(eventName, { customer, referral, loyalty, metadata })
```

---

### Migration to 2.x

Version 2.x of the SDK is fully backward compatible with version 1.x.
Changes made in version 2.x mostly relate to grouping methods within namespaces.
So all you need to do is to follow the list bellow and just replace deprecated methods
with their namespaced equivalent.

We also recommend to adopt [voucher redemption](#redeem-voucher) method, and don't use deprecated invocation.

### Migration to 4.x

This version introduces few major changes:
- drops support for node.js v4 and v6
- drops methods previously marked as deprecated, to make transition easier please check table below.
All those methods were already available in v3.x.

|                      Previously                      |                          Currently                         |
|:----------------------------------------------------:|:----------------------------------------------------------:|
| `client.events.track(eventName, metadata, customer)` | `client.events.create(eventName, { customer, metadata })`  |
| `client.list(params)`                                | `client.vouchers.list(query)`                              |
| `client.get(voucherCode)`                            | `client.vouchers.get(code)`                                |
| `client.create(voucher)`                             | `client.vouchers.create(voucher)`                          |
| `client.update(voucher)`                             | `client.vouchers.update(voucher)`                          |
| `client.delete(voucherCode, [params])`               | `client.vouchers.delete(code, params)`                     |
| `client.disable(voucherCode)`                        | `client.vouchers.disable(code)`                            |
| `client.enable(voucherCode)`                         | `client.vouchers.enable(code)`                             |
| `client.campaign.voucher.create(campaignName)`       | `client.campaigns.addVoucher(campaignName, voucher)`       |
| `client.publish(campaign_name|params)`               | `client.distributions.publish(campaignName)`               |
| `client.validate(voucherCode, params)`               | `client.validations.validateVoucher(code, params)`         |
| `client.redemption(voucherCode)`                     | `client.redemptions.getForVoucher(code)`                   |
| `client.redeem(voucherCode, tracking_id|params)`     | `client.redemptions.redeem(code, trackingId)`              |
| `client.redemptions(query)`                          | `client.redemptions.list(query)`                           |
| `client.rollback(redemptionId, params)`              | `client.redemptions.rollback(redemptionId, data)`          |
| `client.customer.*`                                  | changed namespace to [client.customers.\*](#customers-api) |
| `client.product.*`                                   | changed namespace to [client.products.\*](#products-api)   |
| `client.product.sku.*`                               | changed namespace to [client.products.\*](#products-api)   |

---

### Utils

```javascript
const utils = require('voucherify/utils')
```

Utils don't need callbacks nor promises. They return results immediately.

#### Available methods

- `utils.calculatePrice(basePrice, voucher)`
- `utils.calculateDiscount(basePrice, voucher)`
- `utils.webhooks.verifySignature(signature, message, secretKey)`

## Error handling

Depending what you have choose `error` object of rejected Promise or first argument of provided callback has
consistent structure, described in details in our [API reference](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#errors).

## Contributing

Bug reports and pull requests are welcome through [GitHub Issues](https://github.com/voucherifyio/voucherify-nodejs-sdk/issues).

## Changelog
- **2020-05-28** - `5.1.0`
  - adopted API changes in customer scrolling, dropping support for `ending_before` property. This is technically breaking change but we didn't officially released this feature in API so exceptionally we will increase minor version to not confuse SDK users.
- **2020-05-25** - `5.0.0`
  - [breaking change] Drop support for Node v8
  - Add a way to [scroll over customers](#scroll-through-customers)
  - Add support for bulk update of products
- **2020-04-06** - `4.2.0` - Add support for Updating Customer's consents
- **2020-02-03** - `4.1.0` - expose campaigns and vouchers Qualification API methods
- **2019-11-22** - `4.0.0`
  - Added support for new method
      - Distributions
          - Publications
              - Create
  - [breaking change] - dropped support for node.js v4 and v6
- **2019-06-19** - `3.0.0` - Added support for custom API endpoint, that allows to connect to projects created in specific Voucherify region.
- **2019-05-27** - `2.23.0` - Added support for the methods related to the Loyalty Programs
  - Rewards
    - List
    - Create
    - Get
    - Update
    - Delete
    - Assignments
      - List
      - Create
      - Update
      - Delete
  - Loyalties
    - List
    - Create
    - Get
    - Update
    - Delete
    - Reward Assignments
      - List
      - Create
      - Update
      - Delete
    - Earning Rules
      - List
      - Create
      - Update
      - Delete
    - Members
      - List
      - Create
      - Get
      - Add points
      - Redeem reward
  - Events.create method in Events namespace
  - Add methods to delete campaign
- **2019-03-27** - `2.22.0` - Added Validation Rules validate method `client.validationRules.validate(ruleId, params)`
- **2018-12-28** - `2.21.0`
  - Switch Validation Rules to new model: Business Validation Rules:
    - Validation Rule Object - structure reorganized to handle advanced rules
    - Validation Rule Assignment Object - added object describing a relation between rules and linked promotions
    - Validation Rules - modified​ data model
- **2018-11-19** - `2.20.0` - Allow updating products and SKUs with given source id
- **2018-11-07** - `2.19.0` - Allow to update order with source id `client.orders.update({source_id, ...rest})`
- **2018-10-26** - `2.18.0` - Add Update Campaign method `client.campaigns.update(campaignId, campaign)`
- **2018-10-22** - `2.17.0`
  - Add example of using the `filters` parameter in the method for listing campaigns
  - Allow zero discount in calc utils
- **2018-08-01** - `2.16.0` - Fix reported vulnerabilities (#77)
- **2018-06-14** - `2.15.0` - Fixed the way string errors are handled
- **2018-03-14** - `2.14.0` - Added util method to Verify Webhooks signature
- **2018-01-21** - `2.13.1` - Remove outdated `client.distributions.publish(campaignName)` method interface
- **2017-12-06** - `2.13.0`
  - Fix voucher validation vulnerability
  - Allow to force delete Products and SKUs
  - Add Clients listing
- **2017-11-16** - `2.12.0`
  - Expose Promotions API
  - Update Redemptions and Validations namespace
- **2017-10-24** - `2.11.0` - Expose Events API - track events done by the customers
- **2017-09-14** - `2.10.0`
  - Expose Segments API
  - Expose Orders API
  - Expose Exports API
  - Expose Publications list
- **2017-08-29** - `2.8.0`
  - Expose Campaigns listing
- **2017-08-29** - `2.7.0`
  - Allow to update Customer by source ID when ID not provided
- **2017-08-09** - `2.6.0`
  - Add Validation Rules namespace with CRUD methods
  - Add Balance namespace with support of Add Gift Voucher Balance method
- **2017-04-21** - `2.5.0` - Add option to override channel.
- **2017-04-21** - `2.4.0` - Add option to select specific API version.
- **2017-02-20** - `2.3.0` - Add support for node-v0.10
- **2017-02-10** - `2.1.1` - Bugfix missing `Object.assign` implementation (touched node-v0.12)
- **2017-02-01** - `2.1.0` - Added support for bulk enable/disable vouchers
- **2016-12-02** - `2.0.0` - Rewritten SDK, added missing API methods, updated README. Backward capability is provided but we strongly recommend to follow the [migration from version 1.x](#migration-from-1x)
- **2016-12-01** - `1.23.2` - Support gift vouchers in utils
- **2016-11-15** - `1.23.1` - Validate init options
- **2016-10-26** - `1.23.0` - Error handling improved - passing error object in response to rejected request
- **2016-10-03** - `1.22.0` - Added customer parameter to the rollback method
- **2016-10-03** - `1.21.1` - Updated documentation according to changes in Publish API method
- **2016-09-16** - `1.21.0` - Added method for adding new vouchers to existing campaign
- **2016-09-15** - `1.20.0` - Added method for deleting vouchers by code
- **2016-09-01** - `1.19.0` - Documentation for evaluating validation rules based on order details
- **2016-08-03** - `1.18.1` - Improvements in documentation of SKU API
- **2016-08-02** - `1.18.0` - Implemented new API methods
  - SKU
    - Create
    - Get
    - Update
    - Delete
- **2016-08-02** - `1.17.0` - Validate voucher
- **2016-07-29** - `1.16.0` - Implemented new API methods
  - Product
    - Create
    - Get
    - Update
    - Delete
- **2016-07-18** - `1.15.0` - Voucher update method.
- **2016-06-22** - `1.14.1` - Gift vouchers.
- **2016-06-16** - `1.14.0` - Unified naming convention
- **2016-06-08** - `1.13.0` - Implemented new API methods
  - Customer
    - Create
    - Get
    - Update
    - Delete
- **2016-06-01** - `1.12.0` - tracking_id param removed from redemption rollback method.
- **2016-05-24** - `1.11.0` - New publish structure.
- **2016-04-26** - `1.10.0` - Rollback redemption.
- **2016-04-19** - `1.9.1` - Filter vouchers and redemptions by customer.
- **2016-04-08** - `1.9.0` - Added methods to create, disable and enable a voucher.
- **2016-04-07** - `1.8.0` - List redemptions with filtering.
- **2016-04-04** - `1.7.1` - Updated API URL.
- **2016-03-08** - `1.7.0` - List vouchers with filtering.
- **2016-01-22** - `1.6.0` - Added publish voucher method.
- **2015-12-10** - `1.5.0` - New discount model. Added UNIT - a new discount type.
- **2015-11-23** - `1.4.1` - Added `X-Voucherify-Channel` header.
- **2015-11-10** - `1.4.0` - Add `VoucherifyUtils` which includes `calculatePrice` for computing product/cart price
                             after discount and `calculateDiscount`.
- **2015-11-05** - `1.3.2` - Updated Readme to snake case naming convention
- **2015-10-13** - `1.3.1` - Fixed Readme
- **2015-10-12** - `1.3.0` - Changed API after Voucherify's API change
  - use --> redeem
  - usage --> redemption
- **2015-09-25** - `1.2.0` - Ability to track a detailed customer profile that uses a voucher.
- **2015-09-24** - `1.1.2` - Small fixes in logging.
- **2015-09-11** - `1.1.1` - Updated backend URL.
- **2015-08-13** - `1.1.0` - Ability to track use voucher operation.
  - Properly handling voucher codes with not URL-friendly characters.
- **2015-07-09** - `1.0.1` - Returning to old API URL.
- **2015-07-03** - `1.0.0` - Switching API URL.
- **2015-07-03** - `0.2.0` - Adding promises support.
  - You can either:
    - Pass a callback in order to use *old-school* API style.
    - Or you can skip the callback and use returned promise.
- **2015-07-03** - `0.1.1` - Publishing package in the `npm` repository.
- **2015-07-02** - `0.1.0` - First version:
  - Authentication
  - Voucher informations: *get*, *usage*
  - Voucher operations: *use*

[Create Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-voucher
[Get Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#vouchers-get
[Update Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-voucher
[Delete Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-voucher
[List Vouchers]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-vouchers
[Enable Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#enable-voucher
[Disable Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#disable-voucher
[Import Vouchers]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#import-vouchers-1
[Examine Vouchers Qualification]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#push-qualification-request
[Add Gift Voucher Balance]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#add-gift-voucher-balance

[Create Campaign]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-campaign
[Update Campaign]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-campaign
[Get Campaign]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-campaign
[Add Voucher to Campaign]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#add-voucher-to-campaign
[Import Vouchers to Campaign]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#import-vouchers
[List Campaigns]: https://docs.voucherify.io/v2017-04-20/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-campaigns
[Examine Campaigns Qualification]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-qualification-request

[Create Loyalty Program]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-loyalty-program
[Get Loyalty Program]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-loyalty-program
[Update Loyalty Program]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-loyalty-program
[Delete Loyalty Program]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-loyalty-program
[List Loyalty Programs]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-loyalty-programs
[Create Loyalty Reward Assignment]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-reward-assignment-1
[Update Loyalty Reward Assignment]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-reward-assignment-1
[Delete Loyalty Reward Assignment]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-reward-assignment-1
[List Loyalty Reward Assignments]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-reward-assignments-1
[Create Loyalty Earning Rules]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-earning-rule
[Update Loyalty Earning Rule]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-earning-rule
[Delete Loyalty Earning Rule]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-earning-rule
[List Loyalty Earning Rules]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-earning-rules
[Create Loyalty Member]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-member
[Get Loyalty Member]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-member
[List Loyalty Members]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-members
[Get Member Activities]: https://docs.voucherify.io/reference#get-member-activities
[Add Loyalty Card Balance]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#add-loyalty-card-balance
[Redeem Loyalty Card]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#redeem-loyalty-card

[Publish Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#publish-voucher
[Create Export]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-export
[Get Export]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-export
[Delete Export]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-export
[List publications]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-publications

[Validate Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#validate-voucher

[Redeem Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#redeem-voucher
[List Redemptions]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-redemptions
[Get Voucher's Redemptions]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#vouchers-redemptions
[Rollback Redemption]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#rollback-redemption

[Create Promotion Campaign]: http://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-promotion-campaign
[Validate Promotion Campaign]: http://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#validate-promotions-1
[List Promotion's Tiers]: http://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-promotions
[Create Promotion's Tier]: http://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#add-promotion-tier-to-campaign
[Redeem Promotion's Tier]: http://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#redeem-promotion
[Update Promotion's Tier]: http://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-promotion
[Delete Promotion's Tier]: http://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-promotion

[Create Customer]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-customer
[Get Customer]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#read-customer
[Update Customer]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-customer
[Delete Customer]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-customer
[List Customers]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-customers
[Update Customer's Consents]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-customers-consents
[List Consents]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-consents

[Create Order]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-order
[Get Order]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-order
[Update Order]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-order
[List Orders]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-orders

[Create Product]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-product
[Get Product]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-product
[Update Product]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-product
[Bulk Update Products]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-products-in-bulk
[Delete Product]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-product
[List Products]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-products
[Create SKU]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-sku
[Get SKU]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-sku
[Update SKU]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-sku
[Delete SKU]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-sku
[List all product SKUs]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-skus

[Create Reward]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-reward
[Get Reward]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-reward
[Update Reward]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-reward
[Delete Reward]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-reward
[List Rewards]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-rewards
[Create Reward Assignment]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-reward-assignment
[Update Reward Assignment]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-reward-assignment
[List Reward Assignments]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-reward-assignments

[Create Validation Rule]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-validation-rules
[Get Validation Rule]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-validation-rules
[Update Validation Rule]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-validation-rules
[Delete Validation Rule]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-validation-rules
[List Rules]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-validation-rules
[Create Rule Assignment]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-validation-rules-assignment
[Delete Rule Assignment]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-validation-rules-assignment
[List Rule Assignments]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-validation-rule-assignments

[Create Segment]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-segment
[Get Segment]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-segment
[Delete Segment]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-segment

[Create Custom Event]: http://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-custom-event-object
