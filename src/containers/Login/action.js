import * as types from "./constants";

export const login = data => {
  return {
    type: types.LOGIN,
    payload: {
      data
    }
  };
};

export const loginSuccess = data => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      data
    }
  };
};

export const loginError = error => {
  return {
    type: types.LOGIN_ERROR,
    payload: {
      error
    }
  };
};

export const closeModalError = () => {
  return {
    type: types.CLOSE_LOGIN_ERROR_MODAL
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT
  };
};
