'use strict'

const {encode, isFunction} = require('./helpers')

module.exports = class Products {
  constructor (client) {
    this.client = client
  }

  create (product, callback) {
    return this.client.post('/products', product, callback)
  }

  get (productId, callback) {
    return this.client.get(`/products/${encode(productId)}`, null, callback)
  }

  update (product, callback) {
    return this.client.put(`/products/${encode(product.id)}`, product, callback)
  }

  delete (productId, params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.delete(`/products/${encode(productId)}`, callback, {qs: params})
  }

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }
    return this.client.get('/products', params, callback)
  }

  createSku (productId, sku, callback) {
    return this.client.post(`/products/${encode(productId)}/skus`, sku, callback)
  }

  getSku (productId, skuId, callback) {
    return this.client.get(
      `/products/${encode(productId)}/skus/${encode(skuId)}`,
      null, callback
    )
  }

  updateSku (productId, sku, callback) {
    return this.client.put(
      `/products/${encode(productId)}/skus/${encode(sku.id)}`,
      sku, callback
    )
  }

  deleteSku (productId, skuId, params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.delete(
      `/products/${encode(productId)}/skus/${encode(skuId)}`,
      callback,
      {qs: params}
    )
  }

  listSkus (productId, callback) {
    return this.client.get(`/products/${encode(productId)}/skus`, null, callback)
  }
}
