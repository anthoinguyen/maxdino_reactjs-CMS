import * as types from "./constant";

const initialState = {
  listVideo: [],
  errors: [],
  openModalDeleteVideo: false,
  idDelete: "",
  openModalError: false,
  openModalAddVideo: false,
  videoEdit: [],
  titleModal: "",
  loading: false,
  numberOfPages: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_VIDEO: {
      return {
        ...state,
        listVideo: [],
        errors: [],
        openModalError: false,
        loading: true,
        numberOfPages: 0
      };
    }
    case types.GET_LIST_VIDEO_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listVideo: data.listVideos,
        loading: false,
        numberOfPages: data.numberOfPages
      };
    }
    case types.GET_LIST_VIDEO_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        openModalError: true
      };
    }
    case types.OPEN_MODAL_DELETE_VIDEO: {
      let { data } = action.payload;
      return {
        ...state,
        openModalDeleteVideo: true,
        idDelete: data
      };
    }
    case types.CLOSE_MODAL_DELETE_VIDEO: {
      return {
        ...state,
        openModalDeleteVideo: false,
        idDelete: ""
      };
    }
    case types.DELETE_VIDEO: {
      return {
        ...state
      };
    }
    case types.DELETE_VIDEO_SUCCESS: {
      let { data } = action.payload;
      return {
        ...state,
        listVideo: state.listVideo.filter(item => item.id !== data)
      };
    }
    case types.CLOSE_GET_LIST_VIDEO_ERROR_MODAL: {
      return {
        ...state,
        openModalError: false
      };
    }
    case types.OPEN_MODAL_ADD_VIDEO: {
      return {
        ...state,
        openModalAddVideo: true
      };
    }
    case types.CLOSE_MODAL_ADD_VIDEO: {
      return {
        ...state,
        openModalAddVideo: false,
        videoEdit: []
      };
    }
    case types.ADD_VIDEO: {
      return {
        ...state
      };
    }
    case types.ADD_VIDEO_SUCCESS: {
      const newVideo = action.payload.data.data;
      let dataNewVideo = [newVideo].concat(state.listVideo);
      return {
        ...state,
        listVideo: dataNewVideo
      };
    }
    case types.SET_EDIT_VIDEO: {
      const { data } = action.payload;
      return {
        ...state,
        titleModal: data ? "Edit video" : "Add video",
        videoEdit: data
          ? {
              ...data
            }
          : null
      };
    }
    case types.EDIT_VIDEO: {
      return {
        ...state
      };
    }
    case types.EDIT_VIDEO_SUCCESS: {
      const { data } = action.payload.data;
      const { listVideo } = state;
      const index = listVideo.findIndex(item => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listVideo.slice(0, index),
          data,
          ...listVideo.slice(index + 1)
        ];
        return {
          ...state,
          listVideo: newList
        };
      }
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default reducer;
