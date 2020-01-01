import * as types from "./constants";

export const changePassword = data => {
  return {
    type: types.CHANGE_PASSWORD,
    payload: {
      data
    }
  };
};

export const changePasswordSuccess = data => {
  return {
    type: types.CHANGE_PASSWORD_SUCCESS,
    payload: {
      data
    }
  };
};

export const cancelChangePassword = () => {
  return {
    type: types.CANCEL_CHANGE_PASSWORD
  };
};

export const changePasswordError = error => {
  return {
    type: types.CHANGE_PASSWORD_ERROR,
    payload: {
      error
    }
  };
};

export const closeModalError = () => {
  return {
    type: types.CLOSE_CHANGE_PASSWORD_ERROR_MODAL
  };
};
