
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSeriesInput(data) {
  let errors = {};

  data.level = !isEmpty(data.level) ? data.level : '';

  if (Validator.isEmpty(data.level)) {
    errors.level = 'Level field is required';
  }

  if(Validator.isEmpty(data.series)) {
    errors.series = 'Series field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
