'use strict'

const ApiClient = require('./ApiClient')
const Vouchers = require('./Vouchers')
const {
  assertOption,
  encode,
  isString,
  isObject,
  isFunction
} = require('./helpers')

module.exports = function (options) {
  assertOption(options, 'applicationId')
  assertOption(options, 'clientSecretKey')

  const client = new ApiClient(options)
  const vouchers = new Vouchers(client)

  return {
    vouchers,

    // leaving for backward compatibility
    list: (query, callback) => vouchers.list(query, callback),
    get: (code, callback) => vouchers.get(code, callback),
    create: (voucher, callback) => vouchers.create(voucher, callback),
    delete: (code, params, callback) => vouchers.delete(code, params, callback),
    update: (voucher, callback) => vouchers.update(voucher, callback),
    enable: (code, callback) => vouchers.enable(code, callback),
    disable: (code, callback) => vouchers.disable(code, callback),
    publish: (campaignName, callback) => vouchers.publish(campaignName, callback),

    validate: (code, context = {}, callback = null) => {
      if (isFunction(context)) {
        callback = context
        context = {}
      }

      return client.post(`/vouchers/${encode(code)}/validate`, context, callback)
    },

    redemption: (code, callback) => {
      return client.get(`/vouchers/${encode(code)}/redemption`, null, callback)
    },

    /*
    *  List redemptions. Sample query (1000 successful redemptions from April 2016):
    *  {
    *      limit: 1000,
    *      page: 0,
    *      start_date: '2016-04-01T00:00:00',
    *      end_date: '2016-04-30T23:59:59',
    *      result: 'Success'
    *  }
    */
    redemptions: (query, callback) => {
      return client.get('/redemptions/', query, callback)
    },

    redeem: (code, trackingId, callback) => {
      let context = {}
      if (isObject(code)) {
        context = code
        code = context.voucher
        delete context.voucher
      }
      if (isFunction(trackingId)) {
        callback = trackingId
        trackingId = null
      }

      let url = `/vouchers/${encode(code)}/redemption`

      if (isString(trackingId) && trackingId) {
        url += `?tracking_id=${encode(trackingId)}`
      }

      return client.post(url, context, callback)
    },

    rollback: (redemptionId, data, callback) => {
      if (isFunction(data)) {
        callback = data
        data = null
      }

      let qs = {}
      let payload = {}

      // If `reason` passed, use it in query string.
      if (isString(data)) {
        qs.reason = encode(data)
      }

      if (isObject(data)) {
        const {reason, tracking_id, customer} = data
        qs = {reason, tracking_id}
        payload = {customer}
      }

      return client.post(
        `/redemptions/${encode(redemptionId)}/rollback`,
        payload, callback, {qs}
      )
    },

    campaign: {
      voucher: {
        create: (campaignName, voucher, callback) => {
          return client.post(
            `/campaigns/${encode(campaignName)}/vouchers`,
            // TODO if voucher is optional, secure against callback version
            voucher || {},
            callback
          )
        }
      }
    },

    customer: {
      create: (customer, callback) => {
        return client.post('/customers', customer, callback)
      },

      get: (customerId, callback) => {
        // TODO why fallback to empty string ?! shall we rather throw an error? print warning?
        return client.get(`/customers/${encode(customerId)}`, null, callback)
      },

      update: (customer, callback) => {
        return client.put(`/customers/${encode(customer.id)}`, customer, callback)
      },

      delete: (customerId, callback) => {
        return client.delete(`/customers/${encode(customerId)}`, callback)
      }
    },

    product: {
      create: (product, callback) => {
        return client.post('/products', product, callback)
      },

      get: (productId, callback) => {
        return client.get(`/products/${encode(productId)}`, null, callback)
      },

      update: (product, callback) => {
        return client.put(`/products/${encode(product.id)}`, product, callback)
      },

      delete: (productId, callback) => {
        return client.delete(`/products/${encode(productId)}`, callback)
      },

      sku: {
        create: (productId, sku, callback) => {
          return client.post(`/products/${encode(productId)}/skus`, sku, callback)
        },

        get: (productId, skuId, callback) => {
          return client.get(
            `/products/${encode(productId)}/skus/${encode(skuId)}`,
            null, callback
          )
        },

        update: (productId, sku, callback) => {
          return client.put(
            `/products/${encode(productId)}/skus/${encode(sku.id)}`,
            sku, callback
          )
        },

        delete: (productId, skuId, callback) => {
          return client.delete(
            `/products/${encode(productId)}/skus/${encode(skuId)}`,
            callback
          )
        }
      }
    }
  }
}
