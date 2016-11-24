'use strict'

var util = require('util')

var request = require('request')
var when = require('when')

var backendUrl = 'https://api.voucherify.io/v1'

module.exports = function (options) {
  var headers = {
    'X-App-Id': requiredOption('applicationId'),
    'X-App-Token': requiredOption('clientSecretKey'),
    'X-Voucherify-Channel': 'Node.js-SDK'
  }

  function requiredOption (name) {
    if (!options[name]) {
      throw new Error(`Missing required option '${name}'`)
    }
    return options[name]
  }

  function errorMessage (statusCode, body) {
    body = body || {}
    body.toString = function () {
      return util.format('Unexpected status code: %d - Details: %j', statusCode, body)
    }
    return body
  }

  function prepare (callback) {
    var deferred = when.defer()

    if (typeof (callback) === 'function') {
      return {
        callback: function (error, res, body) {
          if (error || res.statusCode >= 400) {
            callback(error || errorMessage(res.statusCode, body))
            return
          }

          callback(null, body)
        }
      }
    } else {
      return {
        promise: deferred.promise,
        callback: function (error, res, body) {
          if (error || res.statusCode >= 400) {
            deferred.reject(error || errorMessage(res.statusCode, body))
            return
          }

          deferred.resolve(body)
        }
      }
    }
  }

  return {
    /*
    *  List vouchers. Sample query: { limit: 100, skip: 200, category: 'Loyalty' }
    */
    list: function (query, callback) {
      var url = util.format('%s/vouchers/', backendUrl)
      var handler = prepare(callback)

      request.get({ url: url, qs: query, headers: headers, json: true }, handler.callback)

      return handler.promise
    },

    get: function (code, callback) {
      var url = util.format('%s/vouchers/%s', backendUrl, encodeURIComponent(code))
      var handler = prepare(callback)

      request.get({ url: url, headers: headers, json: true }, handler.callback)

      return handler.promise
    },

    create: function (voucher, callback) {
      var url = util.format('%s/vouchers/%s', backendUrl, encodeURIComponent(voucher.code || ''))
      var handler = prepare(callback)

      request.post({ url: url, headers: headers, json: voucher }, handler.callback)

      return handler.promise
    },

    delete: function (voucherCode, params, callback) {
      if (typeof (params) === 'undefined') {
        params = {}
      }

      if (typeof (params) === 'function') {
        callback = params
        params = {}
      }

      var url = util.format('%s/vouchers/%s', backendUrl, encodeURIComponent(voucherCode || ''))
      if (params.force) { url += '?force=true' }

      var handler = prepare(callback)

      request.del({ url: url, headers: headers }, handler.callback)

      return handler.promise
    },

    update: function (voucher, callback) {
      var url = util.format('%s/vouchers/%s', backendUrl, encodeURIComponent(voucher.code))
      var handler = prepare(callback)

      request.put({ url: url, headers: headers, json: voucher }, handler.callback)

      return handler.promise
    },

    enable: function (code, callback) {
      var url = util.format('%s/vouchers/%s/enable', backendUrl, encodeURIComponent(code))
      var handler = prepare(callback)

      request.post({ url: url, headers: headers, json: true }, handler.callback)

      return handler.promise
    },

    disable: function (code, callback) {
      var url = util.format('%s/vouchers/%s/disable', backendUrl, encodeURIComponent(code))
      var handler = prepare(callback)

      request.post({ url: url, headers: headers, json: true }, handler.callback)

      return handler.promise
    },

    validate: function (code, context, callback) {
      if (typeof (context) === 'undefined') {
        context = {}
      }

      if (typeof (context) === 'function') {
        callback = context
        context = {}
      }

      var handler = prepare(callback)
      var url = util.format('%s/vouchers/%s/validate', backendUrl, encodeURIComponent(code))

      request.post({ url: url, headers: headers, json: context }, handler.callback)

      return handler.promise
    },

    redemption: function (code, callback) {
      var url = util.format('%s/vouchers/%s/redemption', backendUrl, encodeURIComponent(code))
      var handler = prepare(callback)

      request.get({ url: url, headers: headers, json: true }, handler.callback)

      return handler.promise
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
    redemptions: function (query, callback) {
      var url = util.format('%s/redemptions/', backendUrl)
      var handler = prepare(callback)

      request.get({ url: url, qs: query, headers: headers, json: true }, handler.callback)

      return handler.promise
    },

    redeem: function (code, trackingId, callback) {
      var context = {}
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

      var handler = prepare(callback)
      var url = util.format('%s/vouchers/%s/redemption', backendUrl, encodeURIComponent(code))

      // If `tracking_id` passed, use it in query string.
      if (typeof (trackingId) === 'string' && trackingId) {
        url += '?tracking_id=' + encodeURIComponent(trackingId)
      }

      request.post({ url: url, headers: headers, json: context }, handler.callback)

      return handler.promise
    },

    rollback: function (redemptionId, data, callback) {
      if (typeof (data) === 'function') {
        callback = data
        data = undefined
      }

      var qs = {}
      var payload = {}

      // If `reason` passed, use it in query string.
      if (typeof (data) === 'string') {
        qs['reason'] = encodeURIComponent(data)
      }

      if (typeof (data) === 'object') {
        qs['reason'] = data['reason'] || undefined
        qs['tracking_id'] = data['tracking_id'] || undefined
        payload['customer'] = data['customer'] || undefined
      }

      var handler = prepare(callback)
      var url = util.format('%s/redemptions/%s/rollback', backendUrl, encodeURIComponent(redemptionId))

      request.post({ url: url, headers: headers, qs: qs, body: payload, json: true }, handler.callback)

      return handler.promise
    },

    publish: function (campaignName, callback) {
      var url = util.format('%s/vouchers/publish', backendUrl)
      var payload = {}
      if (typeof (campaignName) === 'string') {
        url += '?campaign=' + encodeURIComponent(campaignName)
      }
      if (typeof (campaignName) === 'object') {
        payload = campaignName
      }
      var handler = prepare(callback)

      request.post({ url: url, headers: headers, json: payload }, handler.callback)

      return handler.promise
    },

    campaign: {
      voucher: {
        create: function (campaignName, voucher, callback) {
          var url = util.format('%s/campaigns/%s/vouchers', backendUrl, encodeURIComponent(campaignName || ''))
          var handler = prepare(callback)

          request.post({ url: url, headers: headers, json: voucher || {} }, handler.callback)

          return handler.promise
        }
      }
    },

    customer: {
      create: function (customer, callback) {
        var url = util.format('%s/customers', backendUrl)
        var handler = prepare(callback)

        request.post({ url: url, headers: headers, json: customer }, handler.callback)

        return handler.promise
      },

      get: function (customerId, callback) {
        var url = util.format('%s/customers/%s', backendUrl, encodeURIComponent(customerId || ''))
        var handler = prepare(callback)

        request.get({ url: url, headers: headers, json: true }, handler.callback)

        return handler.promise
      },

      update: function (customer, callback) {
        var url = util.format('%s/customers/%s', backendUrl, encodeURIComponent(customer.id || ''))
        var handler = prepare(callback)

        request.put({ url: url, headers: headers, json: customer }, handler.callback)

        return handler.promise
      },

      delete: function (customerId, callback) {
        var url = util.format('%s/customers/%s', backendUrl, encodeURIComponent(customerId || ''))
        var handler = prepare(callback)

        request.del({ url: url, headers: headers }, handler.callback)

        return handler.promise
      }
    },

    product: {
      create: function (product, callback) {
        var url = util.format('%s/products', backendUrl)
        var handler = prepare(callback)

        request.post({ url: url, headers: headers, json: product }, handler.callback)

        return handler.promise
      },

      get: function (productId, callback) {
        var url = util.format('%s/products/%s', backendUrl, encodeURIComponent(productId || ''))
        var handler = prepare(callback)

        request.get({ url: url, headers: headers }, handler.callback)

        return handler.promise
      },

      update: function (product, callback) {
        var url = util.format('%s/products/%s', backendUrl, encodeURIComponent(product.id || ''))
        var handler = prepare(callback)

        request.put({ url: url, headers: headers, json: product }, handler.callback)

        return handler.promise
      },

      delete: function (productId, callback) {
        var url = util.format('%s/products/%s', backendUrl, encodeURIComponent(productId || ''))
        var handler = prepare(callback)

        request.del({ url: url, headers: headers }, handler.callback)

        return handler.promise
      },

      sku: {
        create: function (productId, sku, callback) {
          var url = util.format('%s/products/%s/skus', backendUrl,
          encodeURIComponent(productId || ''))
          var handler = prepare(callback)

          request.post({ url: url, headers: headers, json: sku }, handler.callback)

          return handler.promise
        },

        get: function (productId, skuId, callback) {
          var url = util.format('%s/products/%s/skus/%s', backendUrl,
          encodeURIComponent(productId || ''), encodeURIComponent(skuId || ''))
          var handler = prepare(callback)

          request.get({ url: url, headers: headers }, handler.callback)

          return handler.promise
        },

        update: function (productId, sku, callback) {
          var url = util.format('%s/products/%s/skus/%s', backendUrl,
          encodeURIComponent(productId || ''), encodeURIComponent(sku.id || ''))
          var handler = prepare(callback)

          request.put({ url: url, headers: headers, json: sku }, handler.callback)

          return handler.promise
        },

        delete: function (productId, skuId, callback) {
          var url = util.format('%s/products/%s/skus/%s', backendUrl,
          encodeURIComponent(productId || ''), encodeURIComponent(skuId || ''))
          var handler = prepare(callback)

          request.del({ url: url, headers: headers }, handler.callback)

          return handler.promise
        }
      }
    }
  }
}
