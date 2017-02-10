<p align="center" >
  <img src="./voucherify-nodejs-sdk.png" />
</p>

<h3 align="center">Official <a href="http://voucherify.io?utm_source=github&utm_medium=sdk&utm_campaign=acq">Voucherify</a> SDK for Node.js</h3>

<p align="center">
  <a href="http://standardjs.com/"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="JavaScript Style Guide" /></a>
  <a href="https://travis-ci.org/voucherifyio/voucherify-nodejs-sdk)"><img src="https://travis-ci.org/voucherifyio/voucherify-nodejs-sdk.svg?branch=master" alt="Build Status"/></a>
  <a href="https://www.npmjs.com/package/voucherify"><img src="https://img.shields.io/npm/v/voucherify.svg" alt="NPM Version"/></a>
  <a href="https://www.npmjs.com/package/voucherify"><img src="https://img.shields.io/npm/dm/voucherify.svg" alt="NPM Downloads"/></a>
  <a href="https://www.npmjs.com/package/voucherify"><img src="https://david-dm.org/voucherifyio/voucherify-nodejs-sdk.svg" alt="Dependencies"/></a>
</p>
<hr />

<p align="center">
<b><a href="#migration-from-1x">Migration from 1.x</a></b>
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
<a href="#products-api">Products</a>
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

This SDK is fully consistent with restufl API Voucherify provides.
Detalied description and example responses  you will find at [official docs](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq).
Method headers point to more detalied params description you can use.

### Vouchers API
Methods are provided within `client.vouchers.*` namespace.
- [Create Voucher](#create-voucher)
- [Get Voucher](#get-voucher)
- [Update Voucher](#update-voucher)
- [Delete Voucher](#delete-voucher)
- [List Vouchers](#list-vouchers)
- [Enable Voucher](#enable-voucher)
- [Disable Voucher](#disable-voucher)
- [Import Vouchers](#import-vouchers)

#### [Create Voucher]
```javascript
client.vouchers.create(voucher)
```
Check [voucher oject](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#the-voucher-object).

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

---

### Campaigns API
Methods are provided within `client.campaigns.*` namespace.
- [Create Campaign](#create-campaign)
- [Get Campaign](#get-campaign)
- [Add Voucher to Campaign](#add-voucher-to-campaign)
- [Import Vouchers to Campaign](#import-vouchers-to-campaign)

#### [Create Campaign]
```javascript
client.campaigns.create(campaign)
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

---

### Distributions API
Methods are provided within `client.distributions.*` namespace.

#### [Publish Voucher]
```javascript
client.distributions.publish(campaignName)
client.distributions.publish(params)
```

---

### Validations API
Methods are provided within `client.validations.*` namespace.

#### [Validate Voucher]
```javascript
client.validations.validateVoucher(code)
client.validations.validateVoucher(code, params)
```

---

### Redemptions API
Methods are provided within `client.redemptions.*` namespace.

- [Redeem Voucher](#redeem-voucher)
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

### Customers API
Methods are provided within `client.customers.*` namespace.

- [Create Customer](#create-customer)
- [Get Customer](#get-customer)
- [Update Customer](#update-customer)
- [Delete Customer](#delete-customer)

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
```javascript
client.customers.update(customer)
```
#### [Delete Customer]
```javascript
client.customers.delete(customerId)
```

---

### Products API
Methods are provided within `client.products.*` namespace.

- [Create Product](#create-product)
- [Get Product](#get-product)
- [Update Product](#update-product)
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
#### [Delete Product]
```javascript
client.products.delete(productId)
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
```
#### [List all product SKUs]
```javascript
client.products.listSkus(productId)
```

---

### Migration from 1.x

Version 2.x of the SDK is fully backward compatible with version 1.x.
Changes made in version 2.x mostly relate to grouping methods within namespaces.
So all you need to do is to follow the list bellow and just replace deprecated methods
with their namespaced equivalent.

We also recommend to adopt [voucher redemption](#redeem-voucher) method, and don't use deprecated invocation.

#### Deprecated methods

- `client.list(params)` - [client.vouchers.list](#list-vouchers)
- `client.get(voucherCode)` - [client.vouchers.get](#get-voucher)
- `client.create(voucher)` - [client.vouchers.create](#create-voucher)
- `client.update(voucher)` - [client.vouchers.update](#update-voucher)
- `client.delete(voucherCode, [params])` - [client.vouchers.delete](#delete-voucher)
- `client.disable(voucherCode)` - [client.vouchers.disable](#disable-voucher)
- `client.enable(voucherCode)` - [client.vouchers.enable](#enable-voucher)
- `client.campaign.voucher.create(campaignName)` - [client.campaigns.addVoucher](#add-voucher-to-campaign)
- `client.redemption(voucherCode)` - [client.redemptions.getForVoucher](#get-vouchers-redemptions)
- `client.publish(campaign_name|params)` - [client.distributions.publish](#publish-voucher)
- `client.validate(voucherCode, params)` - [client.validations.validateVoucher](#validate-voucher)
- `client.redeem(voucherCode, tracking_id|params)` - [client.redemptions.redeem](#redeem-voucher)
- `client.redemptions(params)` - [client.redemptions.list](#list-redemptions)
- `client.rollback(redemptionId, params)` - [client.redemptions.rollback](#rollback-redemption)
- `client.customer.*` - changed namespace to [client.customers.\*](#customers-api)
- `client.product.*` - changed namespace to [client.products.\*](#products-api)
- `client.product.sku.*` - changed namespace to [client.products.\*](#products-api)

---

### Utils

```javascript
const utils = require('voucherify/utils')
```

Utils don't need callbacks nor promises. They return results immediately.

#### Available methods

- `utils.calculatePrice(basePrice, voucher)`
- `utils.calculateDiscount(basePrice, voucher)`

## Error handling

Depending what you have choose `error` object of rejected Promise or first argument of provided callback has
consistent structure, described in details in our [API reference](https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#errors).

## Contributing

Bug reports and pull requests are welcome through [GitHub Issues](https://github.com/voucherifyio/voucherify-nodejs-sdk/issues).

## Changelog

- **2017-02-10** - `2.0.0` - Bugfix missing `Object.assign` implementation (touched node-v0.12)
- **2017-02-10** - `2.1.0` - Added support for bulk enable/disable vouchers
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

[Create Campaign]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-campaign
[Get Campaign]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-campaign
[Add Voucher to Campaign]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#add-voucher-to-campaign
[Import Vouchers to Campaign]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#import-vouchers

[Publish Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#publish-voucher

[Validate Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#validate-voucher

[Redeem Voucher]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#redeem-voucher
[List Redemptions]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-redemptions
[Get Voucher's Redemptions]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#vouchers-redemptions
[Rollback Redemption]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#rollback-redemption

[Create Customer]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-customer
[Get Customer]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#read-customer
[Update Customer]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-customer
[Delete Customer]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-customer

[Create Product]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-product
[Get Product]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-product
[Update Product]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-product
[Delete Product]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-product
[List Products]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-products
[Create SKU]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#create-sku
[Get SKU]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#get-sku
[Update SKU]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#update-sku
[Delete SKU]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#delete-sku
[List all product SKUs]: https://docs.voucherify.io/reference?utm_source=github&utm_medium=sdk&utm_campaign=acq#list-skus
