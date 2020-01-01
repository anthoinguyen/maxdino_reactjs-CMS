import * as types from "./constants";

export const requestResetPassword = data => {
  return {
    type: types.REQUEST_RESET_PASSWORD,
    payload: {
      data
    }
  };
};

export const requestResetPasswordSuccess = data => {
  return {
    type: types.REQUEST_RESET_PASSWORD_SUCCESS,
    payload: {
      data
    }
  };
};

export const requestResetPasswordError = error => {
  return {
    type: types.RE_RESET_PASSWORD_ERROR,
    payload: {
      error
    }
  };
};

export const closeModalError = () => {
  return {
    type: types.CLOSE_RE_RESET_PASSWORD_ERROR_MODAL
  };
};
