'use strict';

function roundValue(value, e) {
  return Math.round(value * (e + 0.001)) / e;
}

function validatePercentDiscount(discount) {
  if (!discount || discount < 0 || discount > 100) {
    throw new Error('Invalid voucher, percent discount should be between 0-100.');
  }
}

function validateAmountDiscount(discount) {
  if (!discount || discount < 0) {
    throw new Error("Invalid voucher, amount discount must be higher than zero.");
  }
}

module.exports = {
  calculatePrice: function (basePrice, voucher) {
    var e = 100; // Number of digits after the decimal separator.
    var discount = voucher.discount / e;

    if (voucher.discount_type === 'PERCENT') {
      validatePercentDiscount(discount);
      var priceDiscount = basePrice * (discount/100);
      return roundValue(basePrice - priceDiscount, e);

    } else if (voucher.discount_type === 'AMOUNT') {
      validateAmountDiscount(discount);
      var newPrice = basePrice - discount;
      return roundValue(newPrice > 0 ? newPrice : 0, e);

    } else {
      throw new Error("Unsupported voucher type.");
    }
  },

  calculateDiscount: function(basePrice, voucher) {
    var e = 100; // Number of digits after the decimal separator.
    var discount = voucher.discount / e;

    if (voucher.discount_type === 'PERCENT') {
      validatePercentDiscount(discount);
      return roundValue(basePrice * (discount/100), e);

    } else if (voucher.discount_type === 'AMOUNT') {
      validateAmountDiscount(discount);
      var newPrice = basePrice - discount;
      return roundValue(newPrice > 0 ? discount : basePrice, e);

    } else {
      throw new Error("Unsupported voucher type.");
    }
  }
};