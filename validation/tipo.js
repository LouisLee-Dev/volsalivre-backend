
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTipoInput(data) {
  let errors = {};

  data.tipo = !isEmpty(data.tipo) ? data.tipo : '';

  if (Validator.isEmpty(data.tipo)) {
    errors.tipo = 'Turno field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
