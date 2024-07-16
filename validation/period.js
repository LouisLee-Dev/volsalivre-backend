
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePeriodInput(data) {
  let errors = {};

  data.period = !isEmpty(data.period) ? data.period : '';

  if (Validator.isEmpty(data.period)) {
    errors.period = 'Period field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
