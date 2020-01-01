import * as types from "./constant";

export const getListAsk = (page, pageSize, sorted, filtered) => {
  return {
    type: types.GET_LIST_ASK,
    payload: {
      page,
      pageSize,
      sorted,
      filtered
    }
  };
};

export const getListAskSuccess = data => {
  return {
    type: types.GET_LIST_ASK_SUCCESS,
    payload: {
      data
    }
  };
};

export const getListAskError = error => {
  return {
    type: types.GET_LIST_ASK_ERROR,
    payload: {
      error
    }
  };
};

export const openModalDeleteAsk = data => {
  return {
    type: types.OPEN_MODAL_DELETE_ASK,
    payload: {
      data
    }
  };
};

export const closeModalDeleteAsk = () => {
  return {
    type: types.CLOSE_MODAL_DELETE_ASK
  };
};

export const deleteAsk = data => {
  return {
    type: types.DELETE_ASK,
    payload: {
      data
    }
  };
};

export const deleteAskSuccess = data => {
  return {
    type: types.DELETE_ASK_SUCCESS,
    payload: {
      data
    }
  };
};

export const closeModalGetListAskError = () => {
  return {
    type: types.CLOSE_GET_LIST_ASK_ERROR_MODAL
  };
};

export const openModalEditAsk = () => {
  return {
    type: types.OPEN_MODAL_EDIT_ASK
  };
};

export const closeModalEditAsk = () => {
  return {
    type: types.CLOSE_MODAL_EDIT_ASK
  };
};

export const setEditAsk = data => {
  return {
    type: types.SET_EDIT_ASK,
    payload: {
      data
    }
  };
};

export const editAsk = data => {
  return {
    type: types.EDIT_ASK,
    payload: {
      data
    }
  };
};

export const editAskSuccess = data => {
  return {
    type: types.EDIT_ASK_SUCCESS,
    payload: {
      data
    }
  };
};