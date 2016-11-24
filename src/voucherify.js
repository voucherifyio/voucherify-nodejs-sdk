'use strict'

const ApiClient = require('./ApiClient')

module.exports = function (options) {
  const client = new ApiClient(options)

  return {
    /*
    *  List vouchers. Sample query: { limit: 100, skip: 200, category: 'Loyalty' }
    */
    list: (query, callback) => {
      return client.get('/vouchers/', query, callback)
    },

    get: (code, callback) => {
      return client.get(`/vouchers/${encodeURIComponent(code)}`, null, callback)
    },

    create: (voucher, callback) => {
      const code = voucher.code || ''
      return client.post(`/vouchers/${encodeURIComponent(code)}`, voucher, callback)
    },

    delete: (voucherCode, params, callback) => {
      if (typeof (params) === 'undefined') {
        params = {}
      }

      if (typeof (params) === 'function') {
        callback = params
        params = {}
      }

      const code = voucherCode || ''
      let path = `/vouchers/${encodeURIComponent(code)}`
      if (params.force) {
        path += '?force=true'
      }

      return client.delete(path, callback)
    },

    update: (voucher, callback) => {
      const code = voucher.code || ''
      return client.put(`/vouchers/${encodeURIComponent(code)}`, voucher, callback)
    },

    enable: (code, callback) => {
      return client.post(`/vouchers/${encodeURIComponent(code)}/enable`, null, callback)
    },

    disable: (code, callback) => {
      return client.post(`/vouchers/${encodeURIComponent(code)}/disable`, null, callback)
    },

    validate: (code, context, callback) => {
      if (typeof (context) === 'undefined') {
        context = {}
      }

      if (typeof (context) === 'function') {
        callback = context
        context = {}
      }

      return client.post(`/vouchers/${encodeURIComponent(code)}/validate`, context, callback)
    },

    redemption: (code, callback) => {
      return client.get(`/vouchers/${encodeURIComponent(code)}/redemption`, null, callback)
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
      if (typeof (code) === 'object') {
        context = code
        code = context.voucher
        delete context.voucher
      }
      // No `tracking_id` passed here,
      // use callback from 2n argument.
      if (typeof (trackingId) === 'function') {
        callback = trackingId
        trackingId = undefined
      }

      let url = `/vouchers/${encodeURIComponent(code)}/redemption`
      // If `tracking_id` passed, use it in query string.
      if (typeof (trackingId) === 'string' && trackingId) {
        url += `?tracking_id=${encodeURIComponent(trackingId)}`
      }

      return client.post(url, context, callback)
    },

    rollback: (redemptionId, data, callback) => {
      if (typeof (data) === 'function') {
        callback = data
        data = undefined
      }

      const qs = {}
      const payload = {}

      // If `reason` passed, use it in query string.
      if (typeof (data) === 'string') {
        qs['reason'] = encodeURIComponent(data)
      }

      if (typeof (data) === 'object') {
        qs['reason'] = data['reason'] || undefined
        qs['tracking_id'] = data['tracking_id'] || undefined
        payload['customer'] = data['customer'] || undefined
      }

      return client.post(
        `/redemptions/${encodeURIComponent(redemptionId)}/rollback`,
        payload, callback, {qs}
      )
    },

    publish: function (campaignName, callback) {
      let path = '/vouchers/publish'
      let payload = {}
      if (typeof (campaignName) === 'string') {
        path += '?campaign=' + encodeURIComponent(campaignName)
      }
      if (typeof (campaignName) === 'object') {
        payload = campaignName
      }

      return client.post(path, payload, callback)
    },

    campaign: {
      voucher: {
        create: (campaignName, voucher, callback) => {
          return client.post(
            `/campaigns/${encodeURIComponent(campaignName || '')}/vouchers`,
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
        return client.get(`/customers/${encodeURIComponent(customerId || '')}`, null, callback)
      },

      update: function (customer, callback) {
        return client.put(`/customers/${encodeURIComponent(customer.id || '')}`, customer, callback)
      },

      delete: function (customerId, callback) {
        return client.delete(`/customers/${encodeURIComponent(customerId || '')}`, callback)
      }
    },

    product: {
      create: function (product, callback) {
        return client.post('/products', product, callback)
      },

      get: function (productId, callback) {
        return client.get(`/products/${encodeURIComponent(productId || '')}`, null, callback)
      },

      update: function (product, callback) {
        return client.put(`/products/${encodeURIComponent(product.id || '')}`, product, callback)
      },

      delete: function (productId, callback) {
        return client.delete(`/products/${encodeURIComponent(productId || '')}`, callback)
      },

      sku: {
        create: function (productId, sku, callback) {
          return client.post(`/products/${encodeURIComponent(productId || '')}/skus`, sku, callback)
        },

        get: function (productId, skuId, callback) {
          return client.get(
            `/products/${encodeURIComponent(productId || '')}/skus/${encodeURIComponent(skuId || '')}`,
            null, callback
          )
        },

        update: function (productId, sku, callback) {
          return client.put(
            `/products/${encodeURIComponent(productId || '')}/skus/${encodeURIComponent(sku.id || '')}`,
            sku, callback
          )
        },

        delete: function (productId, skuId, callback) {
          return client.delete(
            `/products/${encodeURIComponent(productId || '')}/skus/${encodeURIComponent(skuId || '')}`,
            callback
          )
        }
      }
    }
  }
}
