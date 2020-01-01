const validate = values => {
  const errors = {};
  const { username, email, admin } = values;
  if (!username) {
    errors.username = "The username is required.";
  } else if (username.trim() && username.length > 30) {
    errors.username = "The username may not be greater than 30 characters.";
  }

  if (!email) {
    errors.email = "The email is required.";
  } else if (email.trim() && email.length > 32) {
    errors.email = "The email may not be greater than 32 characters.";
  } else if (
    email &&
    !/^[a-z0-9][a-z0-9_.]{2,}@[a-z0-9]{2,}(\.[a-z]{2,}){1,3}$/i.test(email)
  ) {
    errors.email = "The email format is invalid.";
  }

  if (admin === null || admin === undefined || admin === "") {
    errors.admin = "The role is required.";
  }

  // if (active === null || active === undefined || active === "") {
  //   errors.active = "The role is required.";
  // }

  return errors;
};

export default validate;
