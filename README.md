## Voucherify Node.js SDK

[Voucherify](http://voucherify.io?utm_source=inbound&utm_medium=github&utm_campaign=voucherify-nodejs-sdk) has a new platform that will help your team automate voucher campaigns. It does this by providing composable API and the marketer-friendly interface that increases teams' productivity:

- **roll-out thousands** of vouchers **in minutes** instead of weeks,
- **check status** or disable **every single** promo code in real time, 
- **track redemption** history and build reports on the fly.

Here you can find a library that makes it easier to integrate Voucherify with your Node.js server.

Full documentation is located at [voucherify.readme.io](https://voucherify.readme.io).

### Usage

#### Authentication

[Log-in](http://app.voucherify.io/#/login) to Voucherify web interface and obtain your Application Keys from [Configuration](https://app.voucherify.io/#/app/configuration):

![](https://www.filepicker.io/api/file/WKYkl2bSAWKHccEN9tEG)

```javascript
var voucherifyClient = require("voucherify");

var voucherify = voucherifyClient({
    applicationId: "YOUR-APPLICATION-ID-OBTAINED-FROM-CONFIGURATION",
    clientSecretKey: "YOUR-CLIENT-SECRET-KEY-OBTAINED-FROM-CONFIGURATION"
});
```

#### Listing vouchers

In a callback:
```javascript
voucherify.list({limit: 10, skip: 20, category: "API Test"}, function(error, vouchers) {
    if (error) {
        console.error("Error: %s", error);
        return;
    }

    console.log(vouchers);
});
```

As a promise:
```javascript
voucherify.list({limit: 10, skip: 20, category: "API Test"})
    .then(function(vouchers) {
        console.log(vouchers);
    })
    .catch(function(error) {
        console.error("Error: %s", error);
    });
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
     "redemption": {
       "quantity": 1,
       "redeemed_quantity": 0,
       "redemption_entries": []
     },
     "active": true,
     "additional_info": null,
     "metadata": null
   },
   {
       "code": "AzTsIH",
       "campaign": null,
       "category": "API Test",
       "discount": {
        "type": "AMOUNT",
        "amount_off": 400
       },
       "start_date": "2016-03-01T10:00:00Z",
       "expiration_date": null,
       "redemption": {
        "quantity": 1,
        "redeemed_quantity": 0,
        "redemption_entries": []
       },
       "active": true,
       "additional_info": null,
       "metadata": null
   },
   ...
]  
```

#### Getting voucher details

In a callback:
```javascript
voucherify.get("v1GiJYuuS", function(error, result) {
    if (error) {
        console.error("Error: %s", error);
        return;
    }

    console.log(result);
});
```

As a promise:
```javascript
voucherify.get("v1GiJYuuS")
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error("Error: %s", error);
    });
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
    "expiration_date": "2015-12-31T23:59:59Z",
    "redemption": {
        "quantity": 3,
        "redeemed_quantity": 1,
        "redemption_entries": [
            {
                "date": "2015-09-24T06:03:35Z",
                "tracking_id": "GENERATED-OR-PROVIDED-TRACKING-ID"
            }
        ]
    },
    "additional_info": ""
}
```

#### Getting voucher redemption

In a callback:
```javascript
voucherify.redemption("v1GiJYuuS", function(error, result) {
    if (error) {
        console.error("Error: %s", error);
        return;
    }

    console.log(result);
});
```

As a promise:
```javascript
voucherify.redemption("v1GiJYuuS")
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error("Error: %s", error);
    });
```

Result:
```json
{
    "quantity": 3,
    "redeemed_quantity": 1,
    "redemption_entries": [
        {
            "date": "2015-09-24T06:03:35Z",
            "tracking_id": "GENERATED-OR-PROVIDED-TRACKING-ID"
        }
    ]
}
```

#### Publishing voucher

This method selects active, unpublished voucher from the specific campaign and returns it to client. 
In result this voucher is marked as published and it will not be announced once again to customer. 

Example:

```javascript
voucherify.publish("First Ride", function(error, result) {
    if (error) {
        console.error("Error: %s", error);
        return;
    }

    console.log(JSON.stringify(result, null, "   "));
});
```

Positive result:

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
   "redemption": {
      "quantity": 1,
      "redeemed_quantity": 0,
      "redemption_entries": []
   },
   "active": true,
   "additional_info": null,
   "metadata": {
      "published": "2016-01-22T09:25:07Z"
   }
}
```

Possible error:

```json
{
  "code": 400,
  "message": "Couldn't find any voucher suitable for publication."
}
```

#### Redeeming voucher

##### 1. Just by code

In a callback:
```javascript
voucherify.redeem("v1GiJYuuS", function(error, result) {
    if (error) {
        console.error("Error: %s", error);
        return;
    }

    console.log(result);
});
```

As a promise:
```javascript
voucherify.redeem("v1GiJYuuS")
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error("Error: %s", error);
    });
```

Result (voucher details after redemption):

```json
{
    "code": "v1GiJYuuS",
    "campaign": "vip",
    "discount": {
        "percent_off": 10.0,
        "type": "PERCENT"
    },
    "expiration_date": "2015-12-31T23:59:59Z",
    "redemption": {
        "quantity": 3,
        "redeemed_quantity": 2,
        "redemption_entries": [
            {
                "date": "2015-09-24T06:03:35Z",
                "tracking_id": "(tracking_id not set)"
            },
            {
                "date": "2015-09-25T10:34:57Z",
                "tracking_id": "(tracking_id not set)"
            },
        ]
    },
    "additional_info": ""
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
voucherify.redeem("v1GiJYuuS", "alice.morgan",
    function(error, result) {
        if (error) {
            console.error("Error: %s", error);
            return;
        }

        console.log(result);
    });
```

```javascript
voucherify.redeem("v1GiJYuuS", "alice.morgan")
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error("Error: %s", error);
    });
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
    "expiration_date": "2015-12-31T23:59:59Z",
    "redemption": {
        "quantity": 3,
        "redeemed_quantity": 3,
        "redemption_entries": [
            {
                "date": "2015-09-24T06:03:35Z",
                "tracking_id": "(tracking_id not set)"
            },
            {
                "date": "2015-09-25T10:34:57Z",
                "tracking_id": "(tracking_id not set)"
            },
            {
                "date": "2015-09-25T12:04:08Z",
                "tracking_id": "alice.morgan"
            },
        ]
    },
    "additional_info": ""
}
```

##### 3. With customer profile

You can record a detailed customer profile consisting of an `id` (obligatory), `name`, `email`, `description` and a `metadata` section that can include any data you wish.

```javascript
voucherify.redeem({
        voucher: "v1GiJYuuS",
        customer: {
            id: "alice.morgan",
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
        console.log(result);
    })
    .catch(function (error) {
        console.error("Error: %s", error);
    });
```

### Listing redemptions

Use `voucherify.redemptions(filter)` to get a filtered list of redemptions.

Example - 1000 successful redemptions from April 2016:

```
var filter = {
    limit: 1000,
    page: 0,
    start_date: "2016-04-01T00:00:00",
    end_date: "2016-04-30T23:59:59",
    result: "Success"
};

voucherify.redemptions(filter)
       .then(function (result) {
           console.log(result);
       })
       .catch(function (error) {
           console.error("Error: %s", error);
       });
```

### Utils

#### Usage
```
var utils = require('voucherify/utils');
```

#### Available methods

- `utils.calculatePrice(basePrice, voucher);`
- `utils.calculateDiscount(basePrice, voucher);`

### Changelog

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
