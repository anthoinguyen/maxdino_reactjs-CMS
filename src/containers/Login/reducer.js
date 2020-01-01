import * as constLogin from "./constants";

const initialState = {
  email: "",
  password: "",
  errors: [],
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constLogin.LOGIN: {
      return {
        ...state
      };
    }
    case constLogin.LOGIN_SUCCESS: {
      return {
        ...state
      };
    }
    case constLogin.LOGIN_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        open: true
      };
    }
    case constLogin.CLOSE_LOGIN_ERROR_MODAL: {
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
