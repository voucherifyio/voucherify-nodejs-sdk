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
    code: 'v1GiJYuuS',
    campaign: 'vip',
    discount: 10,
    discountType: 'PERCENT',
    startDate: '2015-06-31T23:59:59Z',
    expirationDate: '2015-12-31T23:59:59Z',
    usage: {
        quantity: 3,
        usedQuantity: 1
    },
    additionalInfo: null
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
    quantity: 3,
    usedQuantity: 1
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
    quantity: 3,
    usedQuantity: 2
}
*/
```

### Changelog

- **2015-07-03** - `0.2.0` - Adding promises support.
  - You can either:
    - Pass a callback in order to use *old-school* API style.
    - Or you can skip the callback and use returned promise.
- **2015-07-03** - `0.1.1` - Publishing package in the `npm` repository.
- **2015-07-02** - `0.1.0` - First version:
  - Authentication
  - Voucher informations: *get*, *usage*
  - Voucher operations: *use*
