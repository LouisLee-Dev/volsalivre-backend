
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTurnoInput(data) {
  let errors = {};

  data.turno = !isEmpty(data.turno) ? data.turno : '';

  if (Validator.isEmpty(data.turno)) {
    errors.turno = 'Turno field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
