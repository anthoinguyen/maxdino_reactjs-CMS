import { call, takeLatest, put } from "redux-saga/effects";
import * as api from "../../constants/config";
import * as types from "./constants";
import { showLoading, hideLoading } from "../../actions";
import { changePasswordError } from "./action";
import { push, goBack } from "connected-react-router";
import axios from "axios";

const apiChangePassword = async data => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let result = await axios({
    method: "PUT",
    url: `${api.API_CHANGE_PASSWORD}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return result;
};

function* onChangePassword({ payload }) {
  try {
    let { data } = payload;
    yield put(showLoading());
    const resp = yield call(apiChangePassword, data);
    const { status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      yield alert("Change Password Success. Please login again !!!");
      localStorage.removeItem("jwtTokenAdmin");
      yield put(push("/login"));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(changePasswordError(error.response.data));
    } else {
      yield put(changePasswordError(error));
    }
  }
}

function* onCancelChangePassword() {
  yield put(goBack());
}

function* onChangePasswordSaga() {
  yield takeLatest(types.CHANGE_PASSWORD, onChangePassword);
  yield takeLatest(types.CANCEL_CHANGE_PASSWORD, onCancelChangePassword);
}

export default onChangePasswordSaga();
