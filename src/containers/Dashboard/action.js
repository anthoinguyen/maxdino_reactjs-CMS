import * as types from "./constant";

export const getListStatistic = data => {
  return {
    type: types.GET_LIST_STATISTIC,
    payload: {
      data
    }
  };
};

export const getListStatisticSuccess = data => {
  return {
    type: types.GET_LIST_STATISTIC_SUCCESS,
    payload: {
      data
    }
  };
};

export const getListStatisticError = error => {
  return {
    type: types.GET_LIST_STATISTIC_ERROR,
    payload: {
      error
    }
  };
};

export const closeModalGetListStatisticError = () => {
  return {
    type: types.CLOSE_GET_LIST_STATISTIC_ERROR_MODAL
  };
};

