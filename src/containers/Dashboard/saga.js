import { call, takeLatest, put } from "redux-saga/effects";
import { getListStatisticSuccess, getListStatisticError } from "./action";
import * as types from "./constant";
import * as api from "../../constants/config";
import axios from "axios";

const apiGetListStatistic = async token => {
  let result = await axios.get(api.API_GET_LIST_STATISTIC, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
};

function* getListStatistic() {
  try {
    let token = yield localStorage.getItem("jwtTokenAdmin");
    const resp = yield call(apiGetListStatistic, token);
    const { data, status } = resp;
    if (status === 200) {
      yield put(getListStatisticSuccess(data.data));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(getListStatisticError(error.response.data));
    } else {
      yield put(getListStatisticError(error));
    }
  }
}

function* getListStatisticSaga() {
  yield takeLatest(types.GET_LIST_STATISTIC, getListStatistic);
}

export default getListStatisticSaga();
