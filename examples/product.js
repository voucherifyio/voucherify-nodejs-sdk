'use strict'

const voucherifyClient = require('../voucherify');

const voucherify = voucherifyClient({
    applicationId: "d556c347-bf50-4cbc-bef9-b1009f3eef4f",
    clientSecretKey: "f373df80-2536-4bb4-82f6-8b2b9be471ec"
})

const payload = {
    name: "Apple iPhone 6",
    metadata: {
        type: "normal"
    },
    attributes: [
        "attr_one",
        "attr_two"
    ]
}

let skuId = null;

console.log("==== CREATE ====")
voucherify.product.create(payload)
    .then((product) => {
        console.log("New Product: ", product)

        console.log("==== READ ====")
        return voucherify.product.get(product.id)
            .then((result) => {
                console.log("Result: ", result)
                return ;
            })
            .then(() => {
                console.log("==== CREATE - SKU ====")

                var sku = {
                    sku: "APPLE_IPHONE_6_BLACK"
                }

                return voucherify.product.sku.create(product.id, sku)
                    .then((sku) => {
                        console.log("Result: ", sku)
                        console.log("==== GET - SKU ====")

                        return voucherify.product.sku.get(product.id, sku.id)
                            .then((sku) => {
                                console.log("Result: ", sku)
                                console.log("==== UPDATE - SKU ====")

                                sku.sku = "eur";
                                sku.price = 1000;

                                return voucherify.product.sku.update(product.id, sku)
                            })
                    })
                    .then((sku) => {
                        console.log("Result: ", sku)

                        skuId = sku.id;

                        return product;
                    });
            })
    })
    .then((product) => {
        console.log("==== UPDATE ====")

        product.metadata = product.metadata || {};
        product.metadata.type = "premium";

        return voucherify.product.update(product)
            .then((result) => {
                console.log("Result: ", JSON.stringify(result, null, 2))
                return product
            })
    })
    .then((product) => {
        if (!skuId) {
            return product;
        }

        console.log("==== DELETE - SKU ====")

        return voucherify.product.sku.delete(product.id, skuId)
            .then(() => {
                console.log("Checking...")
                return voucherify.product.sku.get(product.id, skuId)
                    .catch((err) => {
                        console.log("Result:", err)
                        return product
                    })
                    .then((product) => {
                        skuId = null;
                        return product;
                    })
            })
    })
    .then((product) => {
        console.log("==== DELETE ====")
        return voucherify.product.delete(product.id)
            .then(() => {
                console.log("Checking...")
                return voucherify.product.get(product.id)
                    .catch((err) => {
                        console.log("Result:", err)
                    })
            })
    })
    .catch((err) => {
        console.error("Error: ", err, err.stack)
    })