const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSchoolRegisterInput(data) {  
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  // data.mark = !isEmpty(data.mark) ? data.mark : "";
  data.position = !isEmpty(data.position) ? data.position : "";
  data.at = !isEmpty(data.at) ? data.at : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  // if (Validator.isEmpty(data.mark)) {
  //   errors.mark = "Mark field is required";
  // }
  if (Validator.isEmpty(data.position)) {
    errors.position = "Position field is required";
  }
  if (Validator.isEmpty(data.at)) {
    errors.at = "At field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
