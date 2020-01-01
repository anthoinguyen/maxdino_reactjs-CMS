import * as types from "./constants";

export const acceptCreatePassword = data => {
  return {
    type: types.ACCEPT_CREATE_PASSWORD,
    payload: {
      data
    }
  };
};

export const acceptCreatePasswordSuccess = data => {
  return {
    type: types.ACCEPT_CREATE_PASSWORD_SUCCESS,
    payload: {
      data
    }
  };
};

export const acceptCreatePasswordError = error => {
  return {
    type: types.AC_CREATE_PASSWORD_ERROR,
    payload: {
      error
    }
  };
};

export const closeModalError = () => {
  return {
    type: types.CLOSE_AC_CREATE_PASSWORD_ERROR_MODAL
  };
};
