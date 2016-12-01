<p align="center" >
  <img src="http://static1.squarespace.com/static/556460c9e4b0e65363ecdd12/t/56c71302b654f948aee0856e/1479111030413/?format=1000w" style="width:400px;background-image:url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2000px-Node.js_logo_2015.svg.png);background-size:60px;background-repeat:no-repeat;background-position:310px 100%"
  />
</p>

<h3 align="center">Official <a href="http://voucherify.io?utm_source=github&utm_medium=sdk&utm_campaign=acq" target="blank">Voucherify</a> Node.js SDK</h3>

<p align="center">
  <a href="http://standardjs.com/"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="JavaScript Style Guide" /></a>
  <a href="https://travis-ci.org/voucherifyio/voucherify-nodejs-sdk)"><img src="https://travis-ci.org/voucherifyio/voucherify-nodejs-sdk.svg?branch=master" alt="Build Status"/></a>
  <a href="https://www.npmjs.com/package/voucherify"><img src="https://img.shields.io/npm/v/voucherify.svg" alt="NPM Version"/></a>
  <a href="https://www.npmjs.com/package/voucherify"><img src="https://img.shields.io/npm/dm/voucherify.svg" alt="NPM Downloads"/></a>
  <a href="https://www.npmjs.com/package/voucherify"><img src="https://david-dm.org/rspective/voucherify-nodejs-sdk.svg" alt="Dependencies"/></a>
</p>
<hr>


<p align="center">
<b><a href="#setup">Setup</a></b>
|
<b><a href="#callback-or-promise">Callback or Promise?</a></b>
|
<b><a href="#api">API</a></b>
|
<b><a href="#error-handling">Error handling</a></b>
|
<b><a href="#contributing">Contributing</a></b>
|
<b><a href="#changelog">Changelog</a></b>
|
<b><a href="#license">License</a></b>
</p>
<hr>

## Setup

`npm install voucherify --save`

[Log-in](http://app.voucherify.io/#/login) to Voucherify web interface and obtain your Application Keys from [Configuration](https://app.voucherify.io/#/app/configuration):

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

- [Vouchers](#vouchers-api)
- [Campaigns](#campaigns-api)
- [Validations](#validations-api)
- [Redemptions](#redemptions-api)
- [Customers](#customers-api)
- [Products](#products-api)
- [Deprecated methods](#deprecated-api)

This SDK is fully consistent with restufl API Voucherify provides.
Detalied description and example responsesx  you will find at [official docs](https://docs.voucherify.io/reference).

### Vouchers API
Methods are provided withing `client.vouchers.*` namespace.

#### Create Voucher
`client.vouchers.create(voucher)`

See [possible voucher fields](https://docs.voucherify.io/docs/vouchers#the-voucher-object) and [example results](https://docs.voucherify.io/reference#create-voucher).

#### Get Voucher
`client.vouchers.get(code)`

#### Update Voucher
`client.vouchers.update(voucher)`

#### Delete Voucher
`client.vouchers.delete(code, [params])`

See available optional [delete params](https://docs.voucherify.io/reference#delete-voucher).

#### List Vouchers
`client.vouchers.list(query)`

See available [query params](https://docs.voucherify.io/reference#list-vouchers).

#### Publish Voucher
- by campaign name
`client.vouchers.publish(campaignName)`
- by param
`client.vouchers.publish(bodyParams)`
See available [params](https://docs.voucherify.io/reference#publish-voucher).

#### Enable Voucher
- `client.vouchers.enable(code)`

#### Disable Voucher
- `client.vouchers.disable(code)`

#### Import Vouchers
- `client.vouchers.import(vouchersArray)`

### Deprecated methods

We strongly encourage you to update your code with new methods.
Each deprecated method has corresponding new namespaced one with the same params,
so migration will go smooth.

- `client.list(filter)` - see [client.vouchers.list](#list-vouchers)
- `client.get(voucher_code)`- see [client.vouchers.get](#get-voucher)
- `client.create(voucher)` - see [client.vouchers.create](#create-voucher)
- `client.update(voucher)` - see [client.vouchers.update](#update-voucher)
- `client.delete(voucher_code, [params])` - see [client.vouchers.delete](#delete-voucher)
- `client.campaign.voucher.create(campaignName, payload)` - see [client.campaigns.addVoucher](#add-voucher-to-campaign)


- `voucherify.disable(voucher_code)`
- `voucherify.enable(voucher_code)`


- `voucherify.redemption(voucher_code)`

- `voucherify.publish(campaign_name)`

- `voucherify.publish(params)`

- `voucherify.validate(code, context)`

- `voucherify.redeem(voucher_code, tracking_id|customer_profile*)`


- `voucherify.redemptions(filter)`

- `voucherify.rollback(redemption_id, options*)`



### Utils

#### Usage

```
const utils = require('voucherify/utils')
```

Utils don't need callbacks nor promises. They return results immediately.

#### Available methods

- `utils.calculatePrice(basePrice, voucher)`
- `utils.calculateDiscount(basePrice, voucher)`

### Changelog

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
