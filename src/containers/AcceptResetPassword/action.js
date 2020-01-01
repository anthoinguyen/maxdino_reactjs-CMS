import * as types from "./constants";

export const acceptResetPassword = data => {
  return {
    type: types.ACCEPT_RESET_PASSWORD,
    payload: {
      data
    }
  };
};

export const acceptResetPasswordSuccess = data => {
  return {
    type: types.ACCEPT_RESET_PASSWORD_SUCCESS,
    payload: {
      data
    }
  };
};

export const acceptResetPasswordError = error => {
  return {
    type: types.AC_RESET_PASSWORD_ERROR,
    payload: {
      error
    }
  };
};

export const closeModalError = () => {
  return {
    type: types.CLOSE_AC_RESET_PASSWORD_ERROR_MODAL
  };
};
