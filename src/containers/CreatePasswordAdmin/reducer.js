import * as types from "./constants";

const initialState = {
  errors: [],
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AC_CREATE_PASSWORD_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true
      };
    }
    case types.CLOSE_AC_CREATE_PASSWORD_ERROR_MODAL: {
      return {
        ...state,
        open: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
