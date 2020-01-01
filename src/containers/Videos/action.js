import * as types from "./constant";

export const getListVideo = (page, pageSize,sorted,filtered) => {
  return {
    type: types.GET_LIST_VIDEO,
    payload: {
      page,
      pageSize,
      sorted,
      filtered
    }
  };
};

export const getListVideoSuccess = data => {
  return {
    type: types.GET_LIST_VIDEO_SUCCESS,
    payload: {
      data
    }
  };
};

export const getListVideoError = error => {
  return {
    type: types.GET_LIST_VIDEO_ERROR,
    payload: {
      error
    }
  };
};

export const openModalDeleteVideo = data => {
  return {
    type: types.OPEN_MODAL_DELETE_VIDEO,
    payload: {
      data
    }
  };
};

export const closeModalDeleteVideo = () => {
  return {
    type: types.CLOSE_MODAL_DELETE_VIDEO
  };
};

export const deleteVideo = data => {
  return {
    type: types.DELETE_VIDEO,
    payload: {
      data
    }
  };
};

export const deleteVideoSuccess = data => {
  return {
    type: types.DELETE_VIDEO_SUCCESS,
    payload: {
      data
    }
  };
};

export const closeModalGetListVideoError = () => {
  return {
    type: types.CLOSE_GET_LIST_VIDEO_ERROR_MODAL
  };
};

export const openModalAddVideo = () => {
  return {
    type: types.OPEN_MODAL_ADD_VIDEO
  };
};

export const closeModalAddVideo = () => {
  return {
    type: types.CLOSE_MODAL_ADD_VIDEO
  };
};

export const addVideo = data => {
  return {
    type: types.ADD_VIDEO,
    payload: {
      data
    }
  };
};

export const addVideoSuccess = data => {
  return {
    type: types.ADD_VIDEO_SUCCESS,
    payload: {
      data
    }
  };
};

export const setEditVideo = data => {
  return {
    type: types.SET_EDIT_VIDEO,
    payload: {
      data
    }
  };
};

export const editVideo = data => {
  return {
    type: types.EDIT_VIDEO,
    payload: {
      data
    }
  };
};

export const editVideoSuccess = data => {
  return {
    type: types.EDIT_VIDEO_SUCCESS,
    payload: {
      data
    }
  };
};
