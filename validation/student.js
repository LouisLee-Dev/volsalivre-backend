const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSchoolRegisterInput(data) {  
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  // data.mark = !isEmpty(data.mark) ? data.mark : "";
  data.parent = !isEmpty(data.parent) ? data.parent : "";
  data.cpf = !isEmpty(data.cpf) ? data.cpf : "";
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  data.cpf = cpfRegex.test(data.cpf) ? data.cpf : "";
  data.serie = !isEmpty(data.serie) ? data.serie : "";
  data.year = !isEmpty(data.year) ? data.year : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }
  if (Validator.isEmpty(data.cpf)) {
    errors.cpf = "CPF field is not type required";
  }
  if (Validator.isEmpty(data.parent)) {
    errors.parent = "parent field is required";
  }
  if (Validator.isEmpty(data.serie)) {
    errors.serie = "Series field is required";
  }
  if (Validator.isEmpty(data.year)) {
    errors.year = "Year field is required";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
