
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNeighborhoodInput(data) {
  let errors = {};

  data.cityId = !isEmpty(data.cityId) ? data.cityId : '';
  data.neigh = !isEmpty(data.neigh) ? data.neigh : '';

  if (Validator.isEmpty(data.cityId)) {
    errors.city = 'City field is required';
  }

  if (Validator.isEmpty(data.neigh)) {
    errors.neigh = 'Neighborhood field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
