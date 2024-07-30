
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePeriodoInput(data) {
  let errors = {};

  data.year = !isEmpty(data.year) ? data.year : '';

  if (Validator.isEmpty(data.year)) {
    errors.period = 'Periodo field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
