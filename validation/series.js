
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSeriesInput(data) {
  let errors = {};

  data.levelId = !isEmpty(data.levelId) ? data.levelId : '';

  if (Validator.isEmpty(data.levelId)) {
    errors.levelId = 'levelId field is required';
  }

  if(Validator.isEmpty(data.series)) {
    errors.series = 'Series field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
