
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLevelInput(data) {
  let errors = {};

  data.level = !isEmpty(data.level) ? data.level : '';

  if (Validator.isEmpty(data.level)) {
    errors.level = 'Level field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
