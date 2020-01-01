const validate = values => {
  const errors = {};
  const { newPassword, confirmNewPassword, currentPassword } = values;
  if (!currentPassword) {
    errors.currentPassword = "The password is required.";
  } else if (currentPassword.trim() && currentPassword.length < 6) {
    errors.currentPassword = "The password must be at least 6 characters.";
  } else if (currentPassword.trim() && currentPassword.length > 16) {
    errors.currentPassword =
      "The password may not be greater than 16 characters.";
  }

  if (!newPassword) {
    errors.newPassword = "The new password is required.";
  } else if (newPassword.trim() && newPassword.length < 6) {
    errors.newPassword = "The new password must be at least 6 characters.";
  } else if (newPassword.trim() && newPassword.length > 16) {
    errors.newPassword =
      "The new password may not be greater than 16 characters.";
  }

  if (!confirmNewPassword) {
    errors.confirmNewPassword = "The new password is required.";
  } else if (confirmNewPassword.trim() && confirmNewPassword.length < 6) {
    errors.confirmNewPassword =
      "The new password must be at least 6 characters.";
  } else if (confirmNewPassword.trim() && confirmNewPassword.length > 16) {
    errors.confirmNewPassword =
      "The new password may not be greater than 16 characters.";
  } else if (confirmNewPassword !== newPassword) {
    errors.confirmNewPassword =
      "The new password and confirm new password don't match";
  }
  
  return errors;
};

export default validate;
