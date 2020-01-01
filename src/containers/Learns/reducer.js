import * as types from "./constant";

const initialState = {
  listLearn: [],
  errors: [],
  openModalDeleteLearn: false,
  idDelete: "",
  openModalError: false,
  openModalAddLearn: false,
  learnEdit: [],
  titleModal: "",
  loading: false,
  numberOfPages: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_LEARN: {
      return {
        ...state,
        listLearn: [],
        errors: [],
        openModalError: false,
        loading: true,
        numberOfPages: 0
      };
    }
    case types.GET_LIST_LEARN_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listLearn: data.listPosts,
        loading: false,
        numberOfPages: data.numberOfPages
      };
    }
    case types.GET_LIST_LEARN_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        openModalError: true
      };
    }
    case types.OPEN_MODAL_DELETE_LEARN: {
      let { data } = action.payload;
      return {
        ...state,
        openModalDeleteLearn: true,
        idDelete: data
      };
    }
    case types.CLOSE_MODAL_DELETE_LEARN: {
      return {
        ...state,
        openModalDeleteLearn: false,
        idDelete: ""
      };
    }
    case types.DELETE_LEARN: {
      return {
        ...state
      };
    }
    case types.DELETE_LEARN_SUCCESS: {
      let { data } = action.payload;
      return {
        ...state,
        listLearn: state.listLearn.filter(item => item.id !== data)
      };
    }
    case types.CLOSE_GET_LIST_LEARN_ERROR_MODAL: {
      return {
        ...state,
        openModalError: false
      };
    }
    case types.OPEN_MODAL_ADD_LEARN: {
      return {
        ...state,
        openModalAddLearn: true
      };
    }
    case types.CLOSE_MODAL_ADD_LEARN: {
      return {
        ...state,
        openModalAddLearn: false,
        learnEdit: []
      };
    }
    case types.ADD_LEARN: {
      return {
        ...state
      };
    }
    case types.ADD_LEARN_SUCCESS: {
      let newLearn = action.payload.data.data;
      // newLearn
      let dataNewLearn = [newLearn].concat(state.listLearn);
      return {
        ...state,
        listLearn: dataNewLearn
      };
    }
    case types.SET_EDIT_LEARN: {
      const { data } = action.payload;
      return {
        ...state,
        titleModal: data ? "Edit Learn" : "Add Learn",
        learnEdit: data
          ? {
              ...data
            }
          : null
      };
    }
    case types.EDIT_LEARN: {
      return {
        ...state
      };
    }
    case types.EDIT_LEARN_SUCCESS: {
      const { data } = action.payload.data;
      const { listLearn } = state;
      const index = listLearn.findIndex(item => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listLearn.slice(0, index),
          data,
          ...listLearn.slice(index + 1)
        ];
        return {
          ...state,
          listLearn: newList
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
