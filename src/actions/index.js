import * as types from "./constant";

export const pushLogin = () => {
  return {
    type: types.PUSH_LOGIN
  };
};

export const pushChangePassword = () => {
  return {
    type: types.PUSH_CHANGE_PASSWORD
  };
};

export const showLoading = () => {
  return {
    type: types.SHOW_LOADING
  };
};

export const hideLoading = () => {
  return {
    type: types.HIDE_LOADING
  };
};

