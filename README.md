## Voucherify SDK

### Usage

#### Authentication

```javascript
var voucherifyClient = require("voucherify");

var voucherify = voucherifyClient({
    applicationId: "YOUR-APPLICATION-ID-OBTAINED-FROM-CONFIGURATION",
    clientSecretKey: "YOUR-CLIENT-SECRET-KEY-OBTAINED-FROM-CONFIGURATION"
});
```

#### Getting voucher details.

```javascript
voucherify.get("v1GiJYuuS", function(error, result) {
    if (error) {
        console.error("Error: %s", error);
        return;
    }

    console.log(result);
});

voucherify.get("v1GiJYuuS")
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error("Error: %s", error);
    });

/*
{
    "code": "kEGAVB3",
    "campaign": "vip",
    "discount": 10.0,
    "discountType": "PERCENT",
    "expirationDate": "2015-12-31T23:59:59Z",
    "usage": {
        "quantity": 3,
        "usedQuantity": 1,
        "usageEntries": [
            {
                "date": "2015-07-04T06:03:35Z",
                "tracking_id": "GENERATED-OR-PROVIDED-TRACKING-ID"
            }
        ]
    },
    "additionalInfo": ""
}
*/
```

#### Getting voucher usage

```javascript
voucherify.usage("v1GiJYuuS", function(error, result) {
    if (error) {
        console.error("Error: %s", error);
        return;
    }

    console.log(result);
});

voucherify.usage("v1GiJYuuS")
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error("Error: %s", error);
    });

/*
{
    "quantity": 3,
    "usedQuantity": 1,
    "usageEntries": [
        {
            "date": "2015-07-04T06:03:35Z",
            "tracking_id": "GENERATED-OR-PROVIDED-TRACKING-ID"
        }
    ]
}
*/
```

#### Using voucher

```javascript
voucherify.use("v1GiJYuuS", function(error, result) {
    if (error) {
        console.error("Error: %s", error);
        return;
    }

    console.log(result);
});

voucherify.use("v1GiJYuuS")
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error("Error: %s", error);
    });

/*
{
    "code": "kEGAVB3",
    "campaign": "vip",
    "discount": 10.0,
    "discountType": "PERCENT",
    "expirationDate": "2015-12-31T23:59:59Z",
    "usage": {
        "quantity": 3,
        "usedQuantity": 1,
        "usageEntries": [
            {
                "date": "2015-07-04T06:03:35Z",
                "tracking_id": "(tracking_id not set)"
            }
        ]
    },
    "additionalInfo": ""
}
*/

// Or with tracking information provided to the request:

voucherify.use("v1GiJYuuS", "GENERATED-OR-PROVIDED-TRACKING-ID",
    function(error, result) {
        if (error) {
            console.error("Error: %s", error);
            return;
        }

        console.log(result);
    });

voucherify.use("v1GiJYuuS", "GENERATED-OR-PROVIDED-TRACKING-ID")
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error("Error: %s", error);
    });
 
/*
{
    "code": "kEGAVB3",
    "campaign": "vip",
    "discount": 10.0,
    "discountType": "PERCENT",
    "expirationDate": "2015-12-31T23:59:59Z",
    "usage": {
        "quantity": 3,
        "usedQuantity": 1,
        "usageEntries": [
            {
                "date": "2015-07-04T06:03:35Z",
                "tracking_id": "GENERATED-OR-PROVIDED-TRACKING-ID"
            }
        ]
    },
    "additionalInfo": ""
}
*/
```

### Changelog

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
