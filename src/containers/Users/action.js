import * as types from "./constant";

export const getListAccount = (page, pageSize, sorted, filtered) => {
  return {
    type: types.GET_LIST_ACCOUNT,
    payload: {
      page,
      pageSize,
      sorted,
      filtered
    }
  };
};

export const getListAccountSuccess = data => {
  return {
    type: types.GET_LIST_ACCOUNT_SUCCESS,
    payload: {
      data
    }
  };
};

export const getListAccountError = error => {
  return {
    type: types.GET_LIST_ACCOUNT_ERROR,
    payload: {
      error
    }
  };
};

export const openModalDeleteAccount = data => {
  return {
    type: types.OPEN_MODAL_DELETE_ACCOUNT,
    payload: {
      data
    }
  };
};

export const closeModalDeleteAccount = () => {
  return {
    type: types.CLOSE_MODAL_DELETE_ACCOUNT
  };
};

export const deleteAccount = data => {
  return {
    type: types.DELETE_ACCOUNT,
    payload: {
      data
    }
  };
};

export const deleteAccountSuccess = data => {
  return {
    type: types.DELETE_ACCOUNT_SUCCESS,
    payload: {
      data
    }
  };
};

export const closeModalGetListAccountError = () => {
  return {
    type: types.CLOSE_GET_LIST_ACCOUNT_ERROR_MODAL
  };
};

export const openModalAddAccount = () => {
  return {
    type: types.OPEN_MODAL_ADD_ACCOUNT
  };
};

export const closeModalAddAccount = () => {
  return {
    type: types.CLOSE_MODAL_ADD_ACCOUNT
  };
};

export const addAccount = data => {
  return {
    type: types.ADD_ACCOUNT,
    payload: {
      data
    }
  };
};

export const addAccountSuccess = data => {
  return {
    type: types.ADD_ACCOUNT_SUCCESS,
    payload: {
      data
    }
  };
};

export const setEditAccount = data => {
  return {
    type: types.SET_EDIT_ACCOUNT,
    payload: {
      data
    }
  };
};

export const editAccount = data => {
  return {
    type: types.EDIT_ACCOUNT,
    payload: {
      data
    }
  };
};

export const editAccountSuccess = data => {
  return {
    type: types.EDIT_ACCOUNT_SUCCESS,
    payload: {
      data
    }
  };
};
