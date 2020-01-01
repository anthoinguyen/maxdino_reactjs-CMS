const validate = values => {
  const errors = {};
  const { password, confirmPassword } = values;

  if (!password) {
    errors.password = "The password is required.";
  } else if (password.trim() && password.length < 6) {
    errors.password = "The password must be at least 6 characters.";
  } else if (password.trim() && password.length > 16) {
    errors.password = "The password may not be greater than 16 characters.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "The password is required.";
  } else if (confirmPassword.trim() && confirmPassword.length < 6) {
    errors.confirmPassword = "The password must be at least 6 characters.";
  } else if (confirmPassword.trim() && confirmPassword.length > 16) {
    errors.confirmPassword =
      "The password may not be greater than 16 characters.";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "The password and confirm password don't match";
  }
  
  return errors;
};

export default validate;
