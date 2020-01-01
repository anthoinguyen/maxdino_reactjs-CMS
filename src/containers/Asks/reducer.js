import * as types from "./constant";

const initialState = {
  listAsk: [],
  errors: [],
  openModalDeleteAsk: false,
  idDelete: "",
  openModalError: false,
  openModalEditAsk: false,
  askEdit: [],
  loading: false,
  numberOfPages: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_ASK: {
      return {
        ...state,
        listAsk: [],
        errors: [],
        openModalError: false,
        loading: true,
        numberOfPages: 0
      };
    }
    case types.GET_LIST_ASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listAsk: data.listPosts,
        loading: false,
        numberOfPages: data.numberOfPages
      };
    }
    case types.GET_LIST_ASK_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        openModalError: true
      };
    }
    case types.OPEN_MODAL_DELETE_ASK: {
      let { data } = action.payload;
      return {
        ...state,
        openModalDeleteAsk: true,
        idDelete: data
      };
    }
    case types.CLOSE_MODAL_DELETE_ASK: {
      return {
        ...state,
        openModalDeleteAsk: false,
        idDelete: ""
      };
    }
    case types.DELETE_ASK: {
      return {
        ...state
      };
    }
    case types.DELETE_ASK_SUCCESS: {
      let { data } = action.payload;
      return {
        ...state,
        listAsk: state.listAsk.filter(item => item.id !== data)
      };
    }
    case types.CLOSE_GET_LIST_ASK_ERROR_MODAL: {
      return {
        ...state,
        openModalError: false
      };
    }
    case types.OPEN_MODAL_EDIT_ASK: {
      return {
        ...state,
        openModalEditAsk: true
      };
    }
    case types.CLOSE_MODAL_EDIT_ASK: {
      return {
        ...state,
        openModalEditAsk: false,
        askEdit: []
      };
    }
    case types.SET_EDIT_ASK: {
      const { data } = action.payload;
      return {
        ...state,
        askEdit: data
          ? {
              ...data
            }
          : null
      };
    }
    case types.EDIT_ASK: {
      return {
        ...state
      };
    }
    case types.EDIT_ASK_SUCCESS: {
      const { data } = action.payload.data;
      const { listAsk } = state;
      const index = listAsk.findIndex(item => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listAsk.slice(0, index),
          data,
          ...listAsk.slice(index + 1)
        ];
        return {
          ...state,
          listAsk: newList
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
