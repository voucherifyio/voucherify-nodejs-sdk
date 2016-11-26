/* eslint-env jasmine */
const utils = require('../src/utils.js')

describe('utils', function () {
  // ------ calculateDiscount ------ //

  it('should calculate amount discount', function () {
    const basePrice = 50
    const voucher = {
      discount: {
        type: 'AMOUNT',
        amount_off: 1000 // 10.00
      }
    }
    const discount = utils.calculateDiscount(basePrice, voucher)

    expect(discount).toBe(10.00)
  })

  it('should calculate percent discount', function () {
    const basePrice = 50
    const voucher = {
      discount: {
        type: 'PERCENT',
        percent_off: 10.00
      }
    }
    const discount = utils.calculateDiscount(basePrice, voucher)

    expect(discount).toBe(5.00)
  })

  it('should calculate unit discount', function () {
    const basePrice = 50
    const unitPrice = 20
    const voucher = {
      discount: {
        type: 'UNIT',
        unit_off: 1.00
      }
    }
    const discount = utils.calculateDiscount(basePrice, voucher, unitPrice)

    expect(discount).toBe(20.00)
  })

  it('should fail to calculate discount for gift voucher', function () {
    const basePrice = 50
    const voucher = {
      gift: {
        amount: 1000
      }
    }

    expect(function () {
      utils.calculateDiscount(basePrice, voucher)
    }).toThrow(new Error('Unsupported voucher type.'))
  })

  // ------ calculatePrice ------ //

  it('should calculate new price with amount discount', function () {
    const basePrice = 50
    const voucher = {
      discount: {
        type: 'AMOUNT',
        amount_off: 1000 // 10.00
      }
    }
    const discount = utils.calculatePrice(basePrice, voucher)

    expect(discount).toBe(40.00)
  })

  it('should calculate new price with percent discount', function () {
    const basePrice = 50
    const voucher = {
      discount: {
        type: 'PERCENT',
        percent_off: 10.00
      }
    }
    const discount = utils.calculatePrice(basePrice, voucher)

    expect(discount).toBe(45.00)
  })

  it('should calculate new price with unit discount', function () {
    const basePrice = 50
    const unitPrice = 20
    const voucher = {
      discount: {
        type: 'UNIT',
        unit_off: 1.00
      }
    }
    const discount = utils.calculatePrice(basePrice, voucher, unitPrice)

    expect(discount).toBe(30.00)
  })

  it('should fail to calculate price for gift voucher', function () {
    const basePrice = 50
    const voucher = {
      gift: {
        amount: 1000
      }
    }

    expect(function () {
      utils.calculatePrice(basePrice, voucher)
    }).toThrow(new Error('Unsupported voucher type.'))
  })
})
