import { call, takeLatest, put, delay } from "redux-saga/effects";
import * as types from "./constants";
import * as api from "../../constants/config";
import { showLoading, hideLoading } from "../../actions";
import { acceptResetPasswordError } from "./action";
import { push } from "connected-react-router";
import axios from "axios";

const apiAcceptResetPassword = async data => {
  let result = await axios({
    method: "POST",
    url: `${api.API_ACCEPT_RESET_PASSWORD}`,
    data: data,
  });
  return result;
};

function* onAccept({ payload }) {
  try {
    let { data } = payload;
    yield put(showLoading());
    const resp = yield call(apiAcceptResetPassword, data);
    const { status } = resp;
    if (status === 200) {
      yield delay(800);
      yield put(hideLoading());
      yield alert("Reset Password Success. Please login !!!");
      yield put(push("/login"));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(acceptResetPasswordError(error.response.data));
    } else {
      yield put(acceptResetPasswordError(error));
    }
  }
}

function* onAcceptResetPasswordSaga() {
  yield takeLatest(types.ACCEPT_RESET_PASSWORD, onAccept);
}

export default onAcceptResetPasswordSaga();
