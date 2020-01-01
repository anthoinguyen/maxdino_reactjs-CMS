import * as types from "./constant";

export const getListLearn = (page, pageSize, sorted, filtered) => {
  return {
    type: types.GET_LIST_LEARN,
    payload: {
      page,
      pageSize,
      sorted,
      filtered
    }
  };
};

export const getListLearnSuccess = data => {
  return {
    type: types.GET_LIST_LEARN_SUCCESS,
    payload: {
      data
    }
  };
};

export const getListLearnError = error => {
  return {
    type: types.GET_LIST_LEARN_ERROR,
    payload: {
      error
    }
  };
};

export const openModalDeleteLearn = data => {
  return {
    type: types.OPEN_MODAL_DELETE_LEARN,
    payload: {
      data
    }
  };
};

export const closeModalDeleteLearn = () => {
  return {
    type: types.CLOSE_MODAL_DELETE_LEARN
  };
};

export const deleteLearn = data => {
  return {
    type: types.DELETE_LEARN,
    payload: {
      data
    }
  };
};

export const deleteLearnSuccess = data => {
  return {
    type: types.DELETE_LEARN_SUCCESS,
    payload: {
      data
    }
  };
};

export const closeModalGetListLearnError = () => {
  return {
    type: types.CLOSE_GET_LIST_LEARN_ERROR_MODAL
  };
};

export const openModalAddLearn = () => {
  return {
    type: types.OPEN_MODAL_ADD_LEARN
  };
};

export const closeModalAddLearn = () => {
  return {
    type: types.CLOSE_MODAL_ADD_LEARN
  };
};

export const addLearn = data => {
  return {
    type: types.ADD_LEARN,
    payload: {
      data
    }
  };
};

export const addLearnSuccess = data => {
  return {
    type: types.ADD_LEARN_SUCCESS,
    payload: {
      data
    }
  };
};

export const setEditLearn = data => {
  return {
    type: types.SET_EDIT_LEARN,
    payload: {
      data
    }
  };
};

export const editLearn = data => {
  return {
    type: types.EDIT_LEARN,
    payload: {
      data
    }
  };
};

export const editLearnSuccess = data => {
  return {
    type: types.EDIT_LEARN_SUCCESS,
    payload: {
      data
    }
  };
};
