// eslint-disable-next-line jsx-a11y/href-no-hash
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSchoolRegisterInput(data) {   
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  // data.mark = !isEmpty(data.mark) ? data.mark : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.neigh = !isEmpty(data.neigh) ? data.neigh : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  // if (Validator.isEmpty(data.mark)) {
  //   errors.mark = "Mark field is required";
  // }
  // if (Validator.isEmpty(data.City)) {
  //   errors.City = "City field is required";
  // }
  // if (Validator.isEmpty(data.neigh)) {
  //   errors.neigh = "At field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
