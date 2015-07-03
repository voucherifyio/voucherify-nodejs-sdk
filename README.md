## Voucherify SDK

### Usage

```javascript
var voucherifyClient = require("voucherify");

var voucherify = voucherifyClient({
    key:   "167a01b7-859c-4b34-c4f2-3650bcf40626",
    token: "c37bbcd2-bb2f-4e1e-bdec-c45d734b5327"
});

// get voucher
voucherify.get("v1GiJYuuS", function(error, result) {
    if (error) { console.error("Error: %s", error); return; }
    console.log(result);
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
});

// get voucher's usage
voucherify.usage("v1GiJYuuS", function(error, result) {
    if (error) { console.error("Error: %s", error); return; }
    console.log(result);
    /*
    {
        quantity: 3,
        usedQuantity: 1
    }
    */
});

// use voucher (1 quantity)
voucherify.use("v1GiJYuuS", function(error, result) {
    if (error) { console.error("Error: %s", error); return; }
    console.log(result);
    /*
    {
        quantity: 3,
        usedQuantity: 2
    }
    */
});
```

### Changelog

- **2015-07-03** - `0.1.1` - Publishing package in `npm`.
- **2015-07-02** - `0.1.0` - First version:
  - Authentication
  - Voucher informations: *get*, *usage*
  - Voucher operations: *use*
