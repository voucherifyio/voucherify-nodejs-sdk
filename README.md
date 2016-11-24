## Voucherify Node.js SDK

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[Voucherify](http://voucherify.io?utm_source=github&utm_medium=sdk&utm_campaign=acq) is an API-first platform for software developers who are dissatisfied with high-maintenance custom coupon software. Our product is a coupon infrastructure through API that provides a quicker way to build coupon generation, distribution and tracking. Unlike legacy coupon software we have:

* an API-first SaaS platform that enables customisation of every aspect of coupon campaigns
* a management console that helps cut down maintenance and reporting overhead
* an infrastructure to scale up coupon activity in no time

Here you can find a library that makes it easier to integrate Voucherify with your Node.js server.

Full documentation is located at [voucherify.readme.io](https://voucherify.readme.io).


### Usage

#### Authentication

[Log-in](http://app.voucherify.io/#/login) to Voucherify web interface and obtain your Application Keys from [Configuration](https://app.voucherify.io/#/app/configuration):

![](https://www.filepicker.io/api/file/WKYkl2bSAWKHccEN9tEG)

```javascript
const voucherifyClient = require("voucherify")

const voucherify = voucherifyClient({
    applicationId: "YOUR-APPLICATION-ID-OBTAINED-FROM-CONFIGURATION",
    clientSecretKey: "YOUR-CLIENT-SECRET-KEY-OBTAINED-FROM-CONFIGURATION"
})
```


#### Callback or Promise?

All methods in the SDK provide both callback based as well as promise based interactions.
If you want to use callbacks just pass them as a last parameter. For example:

```javascript
voucherify.get("v1GiJYuuS", function(error, result) {
    if (error) {
        // handle error
        return
    }

    // do the work
})
```

If you prefer to use promises then the code goes like this:

```javascript
voucherify.get("v1GiJYuuS")
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

All other examples in the readme use promises but they could be as well written with callbacks.


#### Listing vouchers

`voucherify.list(filter, callback*)`

Filter parameters:

- code_query
- limit (default 10)
- skip (default 0)
- category
- campaign
- customer

Example:

```javascript
voucherify.list({limit: 10, skip: 20, category: "API Test"})
    .then(function(vouchers) {
        console.log(vouchers)
    })
    .catch(function(error) {
        console.error("Error: %s", error)
    })
```

Result:

```json
[{
    "code": "9mYBpIk",
    "campaign": null,
    "category": "API Test",
    "discount": {
        "type": "AMOUNT",
        "amount_off": 400
    },
    "start_date": "2016-03-01T12:00:00Z",
    "expiration_date": null,
    "publish": {
        "object": "list",
        "count": 0,
        "data_ref": "entries",
        "entries": []
    },
    "redemption": {
        "object": "list",
        "quantity": 1,
        "data_ref": "redemption_entries",
        "redeemed_quantity": 0,
        "redemption_entries": []
    },
    "active": true,
    "additional_info": null,
    "metadata": null
}, {
    "code": "AzTsIH",
    "campaign": null,
    "category": "API Test",
    "discount": {
        "type": "AMOUNT",
        "amount_off": 400
    },
    "start_date": "2016-03-01T10:00:00Z",
    "expiration_date": null,
    "publish": {
        "object": "list",
        "count": 0,
        "data_ref": "entries",
        "entries": []
    },
    "redemption": {
        "object": "list",
        "quantity": 1,
        "data_ref": "redemption_entries",
        "redeemed_quantity": 0,
        "redeemed_amount": 0,
        "redemption_entries": []
    },
    "active": true,
    "additional_info": null,
    "metadata": null
}]  
```


#### Getting voucher details

`voucherify.get(voucher_code, callback*)`

Example:

```javascript
voucherify.get("v1GiJYuuS")
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

Result:

```json
{
    "code": "v1GiJYuuS",
    "campaign": "vip",
    "discount": {
        "percent_off": 10.0,
        "type": "PERCENT"
    },
    "expiration_date": "2016-12-31T23:59:59Z",
    "publish": {
        "object": "list",
        "count": 0,
        "data_ref": "entries",
        "entries": []
    },
    "redemption": {
        "object": "list",
        "quantity": 1,
        "data_ref": "redemption_entries",
        "redeemed_quantity": 0,
        "redemption_entries": [{
            "id": "r_gQzOnTwmhn2nTLwW4sZslNKY",
            "object": "redemption",
            "date": "2016-04-24T06:03:35Z",
            "customer_id": null,
            "tracking_id": "GENERATED-OR-PROVIDED-TRACKING-ID"
        }]
    },
    "additional_info": ""
}
```


#### Creating a voucher

`voucherify.create(voucher, callback*)`

You can create a voucher with a specified code or let Voucherify generate one.
You can define how to generate the code in `code_config` including following properties:
- `length` - Number of characters in a generated code (excluding prefix and postfix)
- `charset` - Characters that can appear in the code.
- `prefix` - A text appended before the code.
- `postfix` - A text appended after the code.
- `pattern` - A pattern for codes where hashes (#) will be replaced with random characters. Overrides `length`.

Example:

```javascript
    voucherify.create({
        code_config: {
           length: 5,
           charset: "01234567890",
           prefix: "PROMO-",
           postfix: "-2016"
        },
        discount: {
            type: "AMOUNT",
            amount_off: 1000 // 10.00
        },
        category: "Test",
        start_date: "2016-01-01T00:00:00Z",
        expiration_date: "2016-12-31T23:59:59Z"
    })    
    .then(function (result) {
         console.log(result)
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

#### Updating a voucher

`voucherify.update(voucher, callback*)`

You can modify following fields:
- category
- start_date
- expiration_date
- active
- additional_info
- metadata

Other fields than listed above won't be modified. Even if provided they will be silently skipped.

Example:

```javascript
    voucherify.update({
        code: "v1GiJYuuS",
        category: "Updated",
        start_date: "2016-08-01T00:00:00Z",
        expiration_date: "2017-07-31T23:59:59Z"
    })    
    .then(function (result) {
         console.log(result)
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

#### Add voucher to existing Campaign

This method is responsible for adding new voucher to campaign based on voucher definition inherited from campaign. You can give custom values for following fields:
- category
- additional_info
- metadata
- redemption.quantity


Example:

```javascript
const payload = {
    "additional_info": "New voucher",
    "metadata": {
        "test": true
    },
    "redemption": {
        "quantity": 5
    }
}

voucherify.campaign.voucher.create("Campaign-Name", payload)
       .then(function (result) {
           console.log(result)
       })
       .catch(function (error) {
           console.error("Error: %s", error)
       })
```

Result:

```json
{
    "code": "pK0ZSfaB",
    "campaign": "Campaign-Name",
    "category": null,
    "type": "DISCOUNT_VOUCHER",
    "discount": { "type": "AMOUNT", "amount_off": 1000 },
    "gift": null,
    "start_date": "2016-09-14T22:00:00Z",
    "expiration_date": "2016-09-30T21:59:59Z",
    "publish": {
        "object": "list",
        "count": 0,
        "data_ref": "entries",
        "entries": []
    },
    "redemption": {
        "object": "list",
        "quantity": 0,
        "data_ref": "redemption_entries",
        "redeemed_quantity": 0,
        "redemption_entries": []
    },
    "active": true,
    "additional_info": "New voucher",
    "metadata": {
        "test": true
    }
}
```

#### Deleting a voucher

`voucherify.delete(voucher_code, params*, callback*)`

In param object you can pass `force` flag which tells whether voucher will be removed permanently. It means that afterwards user will be able to create next voucher with the same code.

Example:

```javascript
    voucherify.delete("v1GiJYuuS", { force: true })    
    .then(function (result) {
         console.log("Voucher deleted.")
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

Result:

`Result is an empty body`

#### Disabling a voucher

`voucherify.disable(voucher_code, callback*)`

Example:

```javascript
    voucherify.disable("v1GiJYuuS")    
    .then(function (result) {
         console.log("Voucher disabled.")
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

Result:

`Result is an empty body`


#### Enabling a voucher

`voucherify.enable(voucher_code, callback*)`

Example:

```javascript
    voucherify.enable("v1GiJYuuS")    
    .then(function (result) {
         console.log("Voucher enabled.")
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

Result:

`Result is an empty body`


#### Getting voucher redemption

`voucherify.redemption(voucher_code, callback*)`

Example:

```javascript
voucherify.redemption("v1GiJYuuS")
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

Result:

```json
{
    "quantity": 3,
    "redeemed_quantity": 1,
    "redemption_entries": [
        {
            "id": "r_gQzOnTwmhn2nTLwW4sZslNKY",
            "object": "redemption",
            "date": "2016-04-24T06:03:35Z",
            "customer_id": null,
            "tracking_id": "GENERATED-OR-PROVIDED-TRACKING-ID"
        }
    ]
}
```


#### Publishing voucher

`voucherify.publish(campaign_name, callback*)`

`voucherify.publish(params, callback*)`

This method selects a voucher that is suitable for publication, adds a publish entry and returns the voucher.
A voucher is suitable for publication when it's active and hasn't been published more times than the redemption limit.

Example:

By campaign name:

```javascript
voucherify.publish("First Ride")
    .then(function (result) {
        console.log(JSON.stringify(result, null, "   "))
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

By object with campaign name:

```javascript
voucherify.publish({campaign: "First Ride", channel: "Email", customer: "donny.roll@mail.com"})
    .then(function (result) {
        console.log(JSON.stringify(result, null, "   "))
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

By object with voucher code:

```javascript
voucherify.publish({voucher: "FR-zT-u9I7zG", channel: "Email", customer: "donny.roll@mail.com"})
    .then(function (result) {
        console.log(JSON.stringify(result, null, "   "))
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

Result:

```json
{
   "code": "FR-zT-u9I7zG",
   "campaign": "First Ride",
   "category": null,
   "discount": {
      "type": "PERCENT",
      "amount_off": 50
   },
   "start_date": "2015-01-01T00:00:00Z",
   "expiration_date": "2016-12-31T23:59:59Z",
   "publish": {
        "object": "list",
        "count": 1,
        "data_ref": "entries",
        "entries": [{
            "channel": "Email",
            "customer": "donny.roll@mail.com",
            "customer_id": "cust_1fnSUBno3iimKTPNDCkjg4xV",
            "published_at": "2016-01-22T09:25:07Z"
        }]
   },
   "redemption": {
        "object": "list",
        "quantity": 0,
        "data_ref": "redemption_entries",
        "redeemed_quantity": 0,
        "redemption_entries": []
   },
   "active": true,
   "additional_info": null
}
```

Error:

```json
{
  "code": 400,
  "message": "Couldn't find any voucher suitable for publication."
}
```

#### Validating vouchers

Validation lets you check if given voucher code can be successfully redeemed.

`voucherify.validate(code, context)`

The `context` param is generally optional unless you are validating a gift voucher or a voucher with order validation rules.
For gift voucher you have to pass `order.amount` expressed in cents (e.g. $10 is 1000).
Validation rules also require to pass `order.items` as a list of objects including `product_id`, `sku_id` and `quantity`.

Example:

```
validation_result = voucherify.validate("91Ft4U", {
    tracking_id: "john@lemon.com",
    customer: {
         id: "cust_07sVjVsr71Ewot9lVZSrIVLH",
         source_id: "john@lemon.com",
         name: "John Lemon"
    },
    order: {
        amount: 1250
        items: [
            { product_id: "prod_ELvEXqF4qzB7Rs", sku_id: "sku_GoXSOI4FwJZafb", quantity: 1 },
            { product_id: "prod_wye1naw5JO5dh3", sku_id: "sku_U3rHSlfOCGUnbo", quantity: 2 }
        ]
    }
})
```

Successful validation result:
```
{
    code: "91Ft4U",
    valid: true,
    gift: {
        amount: 10000
    },
    tracking_id: "john@lemon.com"
}
```

Failed validation result:
```
{
    code: "91Ft4U",
    valid: false,
    reason: "gift amount exceeded",
    tracking_id: "john@lemon.com"
}
```

There are several reasons why validation may fail (`valid: false` response). You can find the actual cause in the `reason` field:

- `voucher not found`
- `voucher is disabled`
- `voucher not active yet`
- `voucher expired`
- `quantity exceeded`
- `gift amount exceeded`
- `customer does not match segment rules`
- `order does not match validation rules`

#### Redeeming vouchers

`voucherify.redeem(voucher_code, tracking_id|customer_profile*, callback*)`

##### 1. Just by code

Example:

```javascript
voucherify.redeem("v1GiJYuuS")
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

Result (voucher details after redemption):

```json
{
    "id": "r_yRmanaA6EgSE9uDYvMQ5Evfp",
    "object": "redemption",
    "date": "2016-04-25T10:34:57Z",
    "customer_id": null,
    "tracking_id": "(tracking_id not set)",
    "voucher": {
        "code": "v1GiJYuuS",
        "campaign": "vip",
        "discount": {
            "percent_off": 10.0,
            "type": "PERCENT"
        },
        "expiration_date": "2016-12-31T23:59:59Z",
        "redemption": {
            "quantity": 3,
            "redeemed_quantity": 2,
            "redemption_entries": [
                {
                    "id": "r_gQzOnTwmhn2nTLwW4sZslNKY",
                    "object": "redemption",
                    "date": "2016-04-24T06:03:35Z",
                    "customer_id": null,
                    "tracking_id": "(tracking_id not set)"
                },
                {
                    "id": "r_yRmanaA6EgSE9uDYvMQ5Evfp",
                    "object": "redemption",
                    "date": "2016-04-25T10:34:57Z",
                    "customer_id": null,
                    "tracking_id": "(tracking_id not set)"
                }
            ]
        },
        "active": true,
        "additional_info": ""
    }
}
```

Error:

```json
{
  "code": 400,
  "message": "voucher expired or quantity exceeded",
  "details": "v1GiJYuuS"
}
```


##### 2. With tracking id

You can provide a tracking id (e.g. your customer's login or a generated id) to the voucher redemption request.

```javascript
voucherify.redeem("v1GiJYuuS", "alice.morgan")
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

Result:

```json
{
    "id": "r_yRmanaA6EgSE9uDYvMQ5Evfp",
    "object": "redemption",
    "date": "2016-04-25T10:34:57Z",
    "customer_id": "cust_C9qJ3xKgZFqkpMw7b21MF2ow",
    "tracking_id": "alice.morgan",
    "voucher": {
        "code": "v1GiJYuuS",
        "campaign": "vip",
        "discount": {
            "percent_off": 10.0,
            "type": "PERCENT"
        },
        "expiration_date": "2016-12-31T23:59:59Z",
        "redemption": {
            "quantity": 3,
            "redeemed_quantity": 3,
            "redemption_entries": [
                {
                    "id": "r_gQzOnTwmhn2nTLwW4sZslNKY",
                    "object": "redemption",
                    "date": "2016-04-24T06:03:35Z",
                    "customer_id": null,
                    "tracking_id": "(tracking_id not set)"
                },
                {
                    "id": "r_yRmanaA6EgSE9uDYvMQ5Evfp",
                    "object": "redemption",
                    "date": "2016-04-25T10:34:57Z",
                    "customer_id": null,
                    "tracking_id": "(tracking_id not set)"
                },
                {
                    "id": "r_irOQWUTAjthQwnkn5JQM1V6N",
                    "object": "redemption",
                    "date": "2016-04-25T12:04:08Z",
                    "customer_id": "cust_C9qJ3xKgZFqkpMw7b21MF2ow",
                    "tracking_id": "alice.morgan"
                }
            ]
        },
        "active": true,
        "additional_info": ""
    }
}
```

##### 3. With customer profile

You can record a detailed customer profile consisting of a `source_id`, `name`, `email`, `description` and a `metadata` section that can include any data you wish.
Voucherify will create (or update) provided customer profile in its database.

```javascript
voucherify.redeem({
    voucher: "v1GiJYuuS",
    customer: {
        soruce_id: "alice.morgan",
        name: "Alice Morgan",
        email: "alice@morgan.com",
        description: "",
        metadata: {
            locale: "en-GB",
            shoeSize: 5,
            favourite_brands: ["Armani", "L’Autre Chose", "Vicini"]
        }
    })
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```


##### 4. With customer id

If you already created a customer profile in Voucherify's database, whether it was implicitly by providing it to the `redeem` function or explicitly by invoking the [`customer.create`](#create-customer) method, you can identify your customer in following redemptions by a generated id (starting with `cust_`).

```javascript
voucherify.redeem({
    voucher: "v1GiJYuuS",
    customer: {
        id: "cust_C9qJ3xKgZFqkpMw7b21MF2ow"
    })
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.error("Error: %s", error)
    })
```

##### 5. With order amount

Redeeming a gift voucher requires to pass an amount that you wish to withdraw from the voucher.
The same applies to vouchers with validation rules on order's total amount.  
Order amount have to be expressed in cents, as an integer. For example $22.50 should be provided as 2250:    

```javascript
voucherify.redeem({
        voucher: "91Ft4U",
        order: {
            amount: 2250
        })
```

##### 6. With order items

Vouchers with validation rules regarding products or SKUs require to pass `order.items`.
Items are a list of objects consisting of `product_id`, `sku_id` and `quantity`.

```javascript
voucherify.redeem({
        voucher: "91Ft4U",
        order: {
            items: [
                { product_id: "prod_ELvEXqF4qzB7Rs", sku_id: "sku_GoXSOI4FwJZafb", quantity: 1 },
                { product_id: "prod_wye1naw5JO5dh3", sku_id: "sku_U3rHSlfOCGUnbo", quantity: 2 }
            ]
        })
```

### Listing redemptions

Use `voucherify.redemptions(filter, callback*)` to get a filtered list of redemptions.
Filter parameters:

- limit (default: 100)
- page (default: 0)
- start_date (default: beginning of current month)
- end_date (default: end of current month)
- result - Success | Failure-NotExist | Failure-Inactive
- customer

Example - 1000 successful redemptions from April 2016:

```javascript
const filter = {
    limit: 1000,
    page: 0,
    start_date: "2016-04-01T00:00:00",
    end_date: "2016-04-30T23:59:59",
    result: "Success"
}

voucherify.redemptions(filter)
       .then(function (result) {
           console.log(result)
       })
       .catch(function (error) {
           console.error("Error: %s", error)
       })
```


#### Rollback a redemption

Use `voucherify.rollback(redemption_id, options*, callback*)` to revert a redemption.
It will create a rollback entry in `redemption.redemption_entries` and give 1 redemption back to the pool
(decrease `redeemed_quantity` by 1).
Parameter `options` passed as object supports following attributes:
- `reason` - reason why rollback is perform
- `tracking_id` - attribute for tracking customer
- `customer` - customer id or customer object

Possible errors are:
- 404 - Resource not found - if voucher with given `redemption_id` doesn't exist
- 400 - Already rolled back - if redemption with given `redemption_id` has been rolled back already
- 400 - Invalid redemption id - when trying to rollback a rollback.

Example:

Option is a `reason`:
```javascript
voucherify.rollback("r_irOQWUTAjthQwnkn5JQM1V6N", "Wrong user")
       .then(function (result) {
           console.log(result)
       })
       .catch(function (error) {
           console.error("Error: %s", error)
       })
```

Object which contains following options of `reason`, _customer id_ as `customer`:
```javascript
voucherify.rollback("r_irOQWUTAjthQwnkn5JQM1V6N", {
            "reason":       "Wrong user ID",
            "customer":     "cust_1V6NirOQWUwnkn5JQMTAjthQ",
        })
        .then(function (result) {
           console.log(result)
        })
        .catch(function (error) {
           console.error("Error: %s", error)
        })
```

Object which contains customer data:
* Object customer will upsert customer data if exists or will create new if not.
```javascript
voucherify.rollback("r_irOQWUTAjthQwnkn5JQM1V6N", {
            "customer":     {
                "name": "Alice Morgan",
                "source_id": "alice.morgan",
                "email": "alice.morgan@mail.com"
            },
        })
        .then(function (result) {
           console.log(result)
        })
        .catch(function (error) {
           console.error("Error: %s", error)
        })
```


```javascript
voucherify.rollback("r_irOQWUTAjthQwnkn5JQM1V6N", "wrong user")
       .then(function (result) {
           console.log(result)
       })
       .catch(function (error) {
           console.error("Error: %s", error)
       })
```

Result:

```
{
    "id": "rr_1634wLkb8glgRXrTmsxRzDBd",
    "object": "redemption_rollback",
    "date": "2016-04-25T10:35:02Z",
    "tracking_id": "alice.morgan",
    "customer_id": "cust_1V6NirOQWUwnkn5JQMTAjthQ",
    "redemption": "r_irOQWUTAjthQwnkn5JQM1V6N",
    "reason": "wrong user"
    "voucher": {
        "code": "v1GiJYuuS",
        "campaign": "vip",
        "discount": {
            "percent_off": 10.0,
            "type": "PERCENT"
        },
        "expiration_date": "2016-12-31T23:59:59Z",
        "redemption": {
            "quantity": 3,
            "redeemed_quantity": 2,
            "redemption_entries": [
                {
                    "id": "r_gQzOnTwmhn2nTLwW4sZslNKY",
                    "object": "redemption",
                    "date": "2016-04-24T06:03:35Z",
                    "customer_id": null,
                    "tracking_id": "(tracking_id not set)"
                },
                {
                    "id": "r_yRmanaA6EgSE9uDYvMQ5Evfp",
                    "object": "redemption",
                    "date": "2016-04-25T10:34:57Z",
                    "customer_id": null,
                    "tracking_id": "(tracking_id not set)"
                },
                {
                    "id": "r_irOQWUTAjthQwnkn5JQM1V6N",
                    "object": "redemption",
                    "customer_id": "cust_C9qJ3xKgZFqkpMw7b21MF2ow"
                    "date": "2016-04-25T12:04:08Z",
                    "tracking_id": "alice.morgan"
                },
                {
                    "id": "rr_1634wLkb8glgRXrTmsxRzDBd",
                    "object": "redemption_rollback",
                    "date": "2016-04-25T10:35:02Z",
                    "customer_id": null,
                    "tracking_id": "alice.morgan",
                    "redemption": "r_irOQWUTAjthQwnkn5JQM1V6N"
                }
            ]
        },
        "active": true,
        "additional_info": ""
    }
}
```


#### Create Customer

Example:

```javascript
const payload = {
    "source_id": "your-tracking-id",
    "name": "John Doe",
    "email": "email@example.com",
    "description": "Premium user, ACME Inc.",
    "metadata": {
      "lang":"en"
    }
}

voucherify.customer.create(payload)
       .then(function (result) {
           console.log(result)
       })
       .catch(function (error) {
           console.error("Error: %s", error)
       })
```

Result:

```json
{
    "id": "cust_dJRcBf3P9HvmHK5TOrhRUHzL",
    "object": "customer",
    "source_id": "your-tracking-id",
    "name": "John Doe",
    "email": "email@example.com",
    "description": "Premium user, ACME Inc.",
    "metadata": {
        "lang": "en"
    },
    "created_at": "2016-06-06T17:14:55Z"
}
```


#### Get Customer

Example:

```javascript
const customerId = "cust_c2SlN2rKajDdMycd3BmVawJk"

voucherify.customer.get(customerId)
   .then(function (result) {
       console.log(result)
   })
   .catch(function (error) {
       console.error("Error: %s", error)
   })
```

Result:

```json
{
  "id": "cust_c2SlN2rKajDdMycd3BmVawJk",
  "object": "customer",
  "source_id": "your-tracking-id",
  "name": "John Doe",
  "email": "email@example.com",
  "description": "Premium user, ACME Inc.",
  "metadata": {
    "lang": "en"
  },
  "created_at": "2016-06-07T07:35:59Z"
}
```


#### Update Customer

Example:

```javascript
const payload = {
  "name": "John Doe",
  "email": "email@example.com",
  "description":"Premium user, ACME Inc.",
  "metadata": {
    "lang":"en",
    "type":"premium"
  }
}

voucherify.customer.update(payload)
   .then(function (result) {
       console.log(result)
   })
   .catch(function (error) {
       console.error("Error: %s", error)
   })
```

Result:

```json
{
  "id": "cust_c2SlN2rKajDdMycd3BmVawJk",
  "object": "customer",
  "source_id": "your-tracking-id",
  "name": "John Doe",
  "email": "email@example.com",
  "description": "Premium user, ACME Inc.",
  "metadata": {
    "lang": "en",
    "type": "premium"
  },
  "created_at": "2016-06-06T17:14:55Z"
}
```


#### Delete Customer

Example:

```javascript
const customerId = "cust_c2SlN2rKajDdMycd3BmVawJk"

voucherify.customer.delete(customerId)
   .then(function (result) {
       console.log(result)
   })
   .catch(function (error) {
       console.error("Error: %s", error)
   })
```

Result:

`Result is an empty body`


#### Create Product

Example:

```javascript
const payload = {
    "name": "Apple iPhone 6",
    "attributes": [
      "color",
      "memory"
    ],
    "metadata": {
        "type": "normal"
    }
}

voucherify.product.create(payload)
       .then(function (result) {
           console.log(result)
       })
       .catch(function (error) {
           console.error("Error: %s", error)
       })
```

Result:

```json
{
  "id": "prod_YWnt2mNigm76oA",
  "object": "product",
  "name": "Apple iPhone 6",
  "attributes": [
    "color",
    "memory"
  ],
  "metadata": {
    "type": "normal"
  },
  "created_at": "2016-07-29T13:15:24Z",
  "skus": {
    "object": "list",
    "total": 0,
    "data": []
  }
}
```


#### Get Product

Example:

```javascript
const productId = "prod_YWnt2mNigm76oA"

voucherify.product.get(productId)
   .then(function (result) {
       console.log(result)
   })
   .catch(function (error) {
       console.error("Error: %s", error)
   })
```

Result:

```json
{
  "id": "prod_YWnt2mNigm76oA",
  "object": "product",
  "name": "Apple iPhone 6",
  "attributes": [
    "color",
    "memory"
  ],
  "metadata": {
    "type": "normal"
  },
  "created_at": "2016-07-29T13:15:24Z",
  "skus": {
    "object": "list",
    "total": 0,
    "data": []
  }  
}
```


#### Update Product

Example:

```javascript
const payload = {
    "id": "prod_YWnt2mNigm76oA",
    "object": "product",
    "name": "Apple iPhone 6",
    "attributes": [
      "color",
      "memory"
    ],
    "metadata": {
      "type": "ultra premium"
    },
    "created_at": "2016-07-29T13:15:24Z",
    "skus": {
      "object": "list",
      "total": 0,
      "data": []
    }
}

voucherify.product.update(payload)
   .then(function (result) {
       console.log(result)
   })
   .catch(function (error) {
       console.error("Error: %s", error)
   })
```

Result:

```json
{
    "id": "prod_YWnt2mNigm76oA",
    "object": "product",
    "name": "Apple iPhone 6",
    "attributes": [
      "color",
      "memory"
    ],
    "metadata": {
        "type": "ultra premium"
    },
    "created_at": "2016-07-29T13:15:24Z",
    "skus": {
      "object": "list",
      "total": 0,
      "data": []
    }
}
```


#### Delete Product

Example:

```javascript
const productId = "prod_YWnt2mNigm76oA"

voucherify.product.delete(productId)
   .then(function (result) {
       console.log(result)
   })
   .catch(function (error) {
       console.error("Error: %s", error)
   })
```

Result:

`Result is an empty body`



#### Create Sku

Example:

```javascript
const productId = "prod_e8uLMegXZJ4GGS"

const sku = {
    sku: "APPLE_IPHONE_6_BLACK",
    currency: "EUR",
    price: 12000,
    attributes: {
      color: "BLACK",
      memory: "16GB"
    }
}

voucherify.product.sku.create(productId, payload)
       .then(function (result) {
           console.log(result)
       })
       .catch(function (error) {
           console.error("Error: %s", error)
       })
```

Result:

```json
{
    "id": "sku_JXYGfsGbpvsfjv",
    "product_id": "prod_e8uLMegXZJ4GGS",
    "sku": "APPLE_IPHONE_6_BLACK",
    "created_at": "2016-08-02T16:43:47Z",
    "object": "sku"
}
```


#### Get Sku

Example:

```javascript
const productId = "prod_YWnt2mNigm76oA"

const skuId = "sku_JXYGfsGbpvsfjv"

voucherify.product.sku.get(productId, skuId)
   .then(function (result) {
       console.log(result)
   })
   .catch(function (error) {
       console.error("Error: %s", error)
   })
```

Result:

```json
{
    "id": "sku_JXYGfsGbpvsfjv",
    "product_id": "prod_e8uLMegXZJ4GGS",
    "sku": "APPLE_IPHONE_6_BLACK",
    "created_at": "2016-08-02T16:43:47Z",
    "object": "sku"
}
```


#### Update Sku

Example:

```javascript
const sku = {
    "id": "sku_JXYGfsGbpvsfjv",
    "product_id": "prod_e8uLMegXZJ4GGS",
    "sku": "APPLE_IPHONE_6_BLACK",
    "created_at": "2016-08-02T16:43:47Z",
    "object": "sku"
}

sku.currency    = "EUR"
sku.price       = 1000

const productId = sku.product_id

voucherify.product.sku.update(productId, sku)
   .then(function (result) {
       console.log(result)
   })
   .catch(function (error) {
       console.error("Error: %s", error)
   })
```

Result:

```json
{
    "id": "sku_JXYGfsGbpvsfjv",
    "product_id": "prod_e8uLMegXZJ4GGS",
    "sku": "APPLE_IPHONE_6_BLACK",
    "currency": "EUR",
    "price": 1000,
    "created_at": "2016-08-02T16:43:47Z",
    "object": "sku"
}
```


#### Delete Sku

Example:

```javascript

const productId = "prod_e8uLMegXZJ4GGS"

const skuId = "sku_JXYGfsGbpvsfjv"

voucherify.product.sku.delete(productId, skuId)
   .then(function (result) {
       console.log(result)
   })
   .catch(function (error) {
       console.error("Error: %s", error)
   })
```

Result:

`Result is an empty body`



### Utils

#### Usage

```
const utils = require('voucherify/utils')
```

Utils don't need callbacks or promises. They return results immediately.

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
