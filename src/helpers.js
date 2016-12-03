'use strict'

const assertOption = (options, name) => {
  if (!options[name]) {
    throw new Error(`Missing required option '${name}'`)
  }
}

const encode = (value = '') => encodeURIComponent(value)
const isString = (value) => typeof (value) === 'string'
const isObject = (value) => typeof (value) === 'object' && !Array.isArray(value) && value !== null
const isFunction = (value) => typeof (value) === 'function'

module.exports = {
  assertOption,
  encode,
  isString,
  isObject,
  isFunction
}
