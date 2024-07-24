
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRoleInput(data) {
  let errors = {};

  data.role = !isEmpty(data.role) ? data.role : '';

  if (Validator.isEmpty(data.role)) {
    errors.role = 'Role field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
