'use strict'

const ApiClient = require('./ApiClient')

const assertOption = (options, name) => {
  if (!options[name]) {
    throw new Error(`Missing required option '${name}'`)
  }
}

const encode = (value = '') => encodeURIComponent(value)
const isString = (value) => typeof (value) === 'string'
const isObject = (value) => typeof (value) === 'object' && !Array.isArray(value)
const isFunction = (value) => typeof (value) === 'function'

module.exports = function (options) {
  assertOption(options, 'applicationId')
  assertOption(options, 'clientSecretKey')

  const client = new ApiClient(options)

  return {
    /*
    *  List vouchers. Sample query: { limit: 100, skip: 200, category: 'Loyalty' }
    */
    list: (query, callback) => {
      return client.get('/vouchers/', query, callback)
    },

    get: (code, callback) => {
      return client.get(`/vouchers/${encode(code)}`, null, callback)
    },

    create: (voucher, callback) => {
      return client.post(`/vouchers/${encode(voucher.code)}`, voucher, callback)
    },

    delete: (voucherCode, params = {}, callback = null) => {
      if (isFunction(params)) {
        callback = params
        params = {}
      }

      let path = `/vouchers/${encode(voucherCode)}`
      if (params.force) {
        path += '?force=true'
      }

      return client.delete(path, callback)
    },

    update: (voucher, callback) => {
      return client.put(`/vouchers/${encode(voucher.code)}`, voucher, callback)
    },

    enable: (code, callback) => {
      return client.post(`/vouchers/${encode(code)}/enable`, null, callback)
    },

    disable: (code, callback) => {
      return client.post(`/vouchers/${encode(code)}/disable`, null, callback)
    },

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
      // No `tracking_id` passed here,
      // use callback from 2n argument.
      if (isFunction(trackingId)) {
        callback = trackingId
        trackingId = undefined
      }

      let url = `/vouchers/${encode(code)}/redemption`
      // If `tracking_id` passed, use it in query string.
      if (typeof (trackingId) === 'string' && trackingId) {
        url += `?tracking_id=${encode(trackingId)}`
      }

      return client.post(url, context, callback)
    },

    rollback: (redemptionId, data, callback) => {
      if (isFunction(data)) {
        callback = data
        data = undefined
      }

      const qs = {}
      const payload = {}

      // If `reason` passed, use it in query string.
      if (isString(data)) {
        qs['reason'] = encode(data)
      }

        qs['reason'] = data['reason'] || undefined
        qs['tracking_id'] = data['tracking_id'] || undefined
        payload['customer'] = data['customer'] || undefined
      if (isObject(data)) {
      }

      return client.post(
        `/redemptions/${encode(redemptionId)}/rollback`,
        payload, callback, {qs}
      )
    },

    publish: function (campaignName, callback) {
      let path = '/vouchers/publish'
      let payload = {}
      if (isString(campaignName)) {
        qs = {campaign: encode(campaignName)}
      }
      if (isObject(campaignName)) {
        payload = campaignName
      }

      return client.post(path, payload, callback)
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
