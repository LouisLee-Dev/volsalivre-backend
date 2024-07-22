const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.cpf = !isEmpty(data.cpf) ? data.cpf : '';
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  data.cpf = cpfRegex.test(data.cpf) ? data.cpf : "";
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Cpf field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'; 
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 6 })) {
    errors.password = 'Password must be 6 characters';
  }
  if (!Validator.isLength(data.password2, { min: 6, max: 6 })) {
    errors.password2 = 'Password must be 6 characters';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
