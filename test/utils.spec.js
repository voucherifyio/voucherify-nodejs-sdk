var utils = require('../utils.js')

describe('utils', function(){

    // ------ calculateDiscount ------ //

    it('should calculate amount discount', function(){
        var basePrice = 50
        var voucher = {
            discount: {
                type: "AMOUNT",
                amount_off: 1000 // 10.00
            }
        }
        var discount = utils.calculateDiscount(basePrice, voucher)

        expect(discount).toBe(10.00)
    })

    it('should calculate percent discount', function(){
        var basePrice = 50
        var voucher = {
            discount: {
                type: "PERCENT",
                percent_off: 10.00
            }
        }
        var discount = utils.calculateDiscount(basePrice, voucher)

        expect(discount).toBe(5.00)
    })

    it('should calculate unit discount', function(){
        var basePrice = 50
        var unitPrice = 20
        var voucher = {
            discount: {
                type: "UNIT",
                unit_off: 1.00
            }
        }
        var discount = utils.calculateDiscount(basePrice, voucher, unitPrice)

        expect(discount).toBe(20.00)
    })

    it('should fail to calculate discount for gift voucher', function(){
        var basePrice = 50
        var unitPrice = 20
        var voucher = {
            gift: {
                amount: 1000
            }
        }

        expect(function() {
            utils.calculateDiscount(basePrice, voucher)
        }).toThrow(new Error("Unsupported voucher type."))
    })

    // ------ calculatePrice ------ //

    it('should calculate new price with amount discount', function(){
        var basePrice = 50
        var voucher = {
            discount: {
                type: "AMOUNT",
                amount_off: 1000 // 10.00
            }
        }
        var discount = utils.calculatePrice(basePrice, voucher)

        expect(discount).toBe(40.00)
    })

    it('should calculate new price with percent discount', function(){
        var basePrice = 50
        var voucher = {
            discount: {
                type: "PERCENT",
                percent_off: 10.00
            }
        }
        var discount = utils.calculatePrice(basePrice, voucher)

        expect(discount).toBe(45.00)
    })

    it('should calculate new price with unit discount', function(){
        var basePrice = 50
        var unitPrice = 20
        var voucher = {
            discount: {
                type: "UNIT",
                unit_off: 1.00
            }
        }
        var discount = utils.calculatePrice(basePrice, voucher, unitPrice)

        expect(discount).toBe(30.00)
    })


    it('should fail to calculate price for gift voucher', function(){
        var basePrice = 50
        var voucher = {
            gift: {
                amount: 1000
            }
        }

        expect(function() {
            utils.calculatePrice(basePrice, voucher)
        }).toThrow(new Error("Unsupported voucher type."))
    })


})
