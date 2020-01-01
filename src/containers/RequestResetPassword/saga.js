import { call, takeLatest, put } from "redux-saga/effects";
import * as api from "../../constants/config";
import * as types from "./constants";
import { showLoading, hideLoading } from "../../actions";
import { requestResetPasswordError } from "./action";
import axios from "axios";
import { push } from "connected-react-router";

const apiRequest = async data => {
  let result = await axios({
    method: "POST",
    url: `${api.API_REQUEST_RESET_PASSWORD}`,
    data: data
  });
  return result;
};

function* onRequest({ payload }) {
  try {
    const result = payload.data;
    yield put(showLoading());
    const resp = yield call(apiRequest, result);
    const { status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      alert("Please check mail to reset password !!!");
      yield put(push("/login"));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(requestResetPasswordError(error.response.data));
    } else {
      yield put(requestResetPasswordError(error));
    }
  }
}

function* onRequestResetPasswordSaga() {
  yield takeLatest(types.REQUEST_RESET_PASSWORD, onRequest);
}

export default onRequestResetPasswordSaga();
