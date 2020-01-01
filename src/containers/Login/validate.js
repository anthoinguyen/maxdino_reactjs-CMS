const validate = values => {
  const errors = {};
  const { password, email } = values;
  if (!password) {
    errors.password = "The password is required.";
  } else if (password.trim() && password.length < 6) {
    errors.password = "The password must be at least 6 characters.";
  } else if (password.trim() && password.length > 16) {
    errors.password = "The password may not be greater than 16 characters.";
  }

  if (!email) {
    errors.email = "The email is required.";
  } else if (
    email &&
    !/^[a-z][a-z0-9_.]{2,}@[a-z0-9]{2,}(\.[a-z]{2,}){1,2}$/i.test(email)
  ) {
    errors.email = "The email format is invalid.";
  }
  return errors;
};

export default validate;
