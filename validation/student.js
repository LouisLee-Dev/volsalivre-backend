const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSchoolRegisterInput(data) {  
  console.log(data);
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  // data.mark = !isEmpty(data.mark) ? data.mark : "";
  data.parent = !isEmpty(data.parent) ? data.parent : "";
  data.school = !isEmpty(data.school) ? data.school : "";
  data.year = !isEmpty(data.year) ? data.year : "";
  data.tipo = !isEmpty(data.tipo) ? data.tipo : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }
  if (Validator.isEmpty(data.parent)) {
    errors.parent = "parent field is required";
  }
  if (Validator.isEmpty(data.school)) {
    errors.school = "schools field is required";
  }
  if (Validator.isEmpty(data.year)) {
    errors.year = "Year field is required";
  }
  if (Validator.isEmpty(data.tipo)) {
    errors.tipo = "tipo field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
