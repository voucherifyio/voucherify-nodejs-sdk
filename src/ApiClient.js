'use strict'

const request = require('request')
const when = require('when')

const errorMessage = (statusCode, body) => {
  body = body || {}
  body.toString = function () {
    return `Unexpected status code: ${statusCode} - Details: ${JSON.stringify(body)}`
  }
  return body
}

const prepare = (callback) => {
  const deferred = when.defer()

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

module.exports = class ApiClient {
  constructor ({applicationId, clientSecretKey}) {
    this.basePath = 'https://api.voucherify.io/v1'
    this.headers = {
      'X-App-Id': applicationId,
      'X-App-Token': clientSecretKey,
      'X-Voucherify-Channel': 'Node.js-SDK'
    }
  }

  prepareOptions (path, options) {
    return Object.assign({
      url: `${this.basePath}${path}`,
      headers: this.headers,
      json: true
    }, options)
  }

  get (path, qs, callback) {
    const handler = prepare(callback)
    request.get(this.prepareOptions(path, {qs}), handler.callback)
    return handler.promise
  }

  post (path, body, callback, options = {}) {
    const handler = prepare(callback)
    request.post(this.prepareOptions(path, Object.assign({}, body, {options})), handler.callback)
    return handler.promise
  }

  put (path, body, callback, options = {}) {
    const handler = prepare(callback)
    request.put(this.prepareOptions(path, Object.assign({}, body, {options})), handler.callback)
    return handler.promise
  }

  delete (path, callback, options = {}) {
    const handler = prepare(callback)
    request.del(this.prepareOptions(path, options), handler.callback)
    return handler.promise
  }
}
