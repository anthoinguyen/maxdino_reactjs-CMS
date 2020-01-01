import * as types from "./constant";
const initialState = {
  ask: 0,
  learn: 0,
  video: 0,
  account: 0,
  errors: [],
  openModalError: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_STATISTIC: {
      return {
        ...state,
        ask: 0,
        learn: 0,
        video: 0,
        account: 0,
        errors: [],
        openModalError: false
      };
    }
    case types.GET_LIST_STATISTIC_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        ask: data.ask,
        learn: data.learn,
        video: data.video,
        account: data.account
      };
    }
    case types.GET_LIST_STATISTIC_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        openModalError: true
      };
    }
    case types.CLOSE_GET_LIST_STATISTIC_ERROR_MODAL: {
      return {
        ...state,
        openModalError: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
