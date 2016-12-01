var utils = require('../utils.js');

describe('utils', function(){

    // ------ calculateDiscount ------ //

    it('should calculate amount discount', function(){
        var basePrice = 50;
        var voucher = {
            discount: {
                type: "AMOUNT",
                amount_off: 1000 // 10.00
            }
        };
        var discount = utils.calculateDiscount(basePrice, voucher);

        expect(discount).toBe(10.00);
    });

    it('should calculate percent discount', function(){
        var basePrice = 50;
        var voucher = {
            discount: {
                type: "PERCENT",
                percent_off: 10.00
            }
        };
        var discount = utils.calculateDiscount(basePrice, voucher);

        expect(discount).toBe(5.00);
    });

    it('should calculate unit discount', function(){
        var basePrice = 50;
        var unitPrice = 20;
        var voucher = {
            discount: {
                type: "UNIT",
                unit_off: 1.00
            }
        };
        var discount = utils.calculateDiscount(basePrice, voucher, unitPrice);

        expect(discount).toBe(20.00);
    });

    it('should calculate discount for gift voucher when balance is less than base price', function(){
        var basePrice = 75;
        var voucher = {
            gift: {
                amount: 10000,
                balance: 5000
            }
        };

        var discount = utils.calculateDiscount(basePrice, voucher);

        expect(discount).toBe(50.00);
    });

    it('should calculate discount for gift voucher when balance is greater than base price', function(){
        var basePrice = 75.00;
        var voucher = {
            gift: {
                amount: 10000,
                balance: 10000
            }
        };

        var discount = utils.calculateDiscount(basePrice, voucher);

        expect(discount).toBe(75.00);
    });

    // ------ calculatePrice ------ //

    it('should calculate new price with amount discount', function(){
        var basePrice = 50.00;
        var voucher = {
            discount: {
                type: "AMOUNT",
                amount_off: 1000 // 10.00
            }
        };
        var discount = utils.calculatePrice(basePrice, voucher);

        expect(discount).toBe(40.00);
    });

    it('should calculate new price with percent discount', function(){
        var basePrice = 50;
        var voucher = {
            discount: {
                type: "PERCENT",
                percent_off: 10.00
            }
        };
        var discount = utils.calculatePrice(basePrice, voucher);

        expect(discount).toBe(45.00);
    });

    it('should calculate new price with unit discount', function(){
        var basePrice = 50;
        var unitPrice = 20;
        var voucher = {
            discount: {
                type: "UNIT",
                unit_off: 1.00
            }
        };
        var discount = utils.calculatePrice(basePrice, voucher, unitPrice);

        expect(discount).toBe(30.00);
    });


    it('should calculate new price for gift voucher when balance is less than base price', function(){
        var basePrice = 75.00;
        var voucher = {
            gift: {
                amount: 10000,
                balance: 5000
            }
        };

        var discount = utils.calculatePrice(basePrice, voucher);

        expect(discount).toBe(25.00);
    });

    it('should calculate new price for gift voucher when balance is greater than base price', function(){
        var basePrice = 75.00;
        var voucher = {
            gift: {
                amount: 10000,
                balance: 10000
            }
        };

        var discount = utils.calculatePrice(basePrice, voucher);

        expect(discount).toBe(0.00);
    });


});