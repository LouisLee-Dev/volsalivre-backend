
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCityInput(data) {
  let errors = {};

  data.city = !isEmpty(data.city) ? data.city : '';

  if (Validator.isEmpty(data.city)) {
    errors.city = 'city field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
