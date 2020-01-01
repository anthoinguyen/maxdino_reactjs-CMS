import { call, takeLatest, put } from "redux-saga/effects";
import * as types from "./constants";
import * as api from "../../constants/config";
import * as constCommon from "../../actions/constant";
import { push } from "connected-react-router";
import { loginSuccess, loginError } from "./action";
import { showLoading, hideLoading, pushLogin } from "../../actions";
import axios from "axios";

const CancelToken = axios.CancelToken;
let cancel;

const apiLogin = async data => {
  if (cancel !== undefined) cancel();
  let result = await axios({
    method: "POST",
    url: `${api.API_LOGIN}`,
    data: {
      email: data.email,
      password: data.password,
      admin: true
    },
    cancelToken: new CancelToken(c => (cancel = c))
  });
  return result;
};

function* onLogin({ payload }) {
  try {
    const result = payload.data;
    yield put(showLoading());
    const resp = yield call(apiLogin, result);
    const { data, status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      yield put(loginSuccess(data));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(loginError(error.response.data));
    } else {
      yield put(loginError(error));
    }
  }
}

const apiLogout = async () => {
  if (cancel !== undefined) cancel();
  let token = await localStorage.getItem("jwtTokenAdmin");
  let result = axios({
    method: "POST",
    url: `${api.API_LOGOUT}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    cancelToken: new CancelToken(c => (cancel = c))
  });
  return result;
};

function* onLogoutSaga() {
  try {
    yield put(showLoading());
    const resp = yield call(apiLogout);
    const { status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      yield put(pushLogin());
    }
  } catch (error) {
    yield put(hideLoading());
    yield put(pushLogin());
  }
}

function* onLoginSuccess({ payload }) {
  const { data } = payload.data;
  console.log(data);
  localStorage.setItem("jwtTokenAdmin", data.token);
  localStorage.setItem("id", data.user ? data.user.id : "");
  localStorage.setItem("name", data.user ? data.user.username : "");
  localStorage.setItem("avatar", data.user ? data.user.avatar : null);
  yield put(push("/admin"));
}

function* pushLoginSaga() {
  localStorage.removeItem("jwtTokenAdmin");
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("avatar");
  yield put(push("/login"));
}

function* pushChangePasswordSaga() {
  yield put(push("/change-password"));
}

function* onLoginSaga() {
  yield takeLatest(types.LOGIN, onLogin);
  yield takeLatest(types.LOGIN_SUCCESS, onLoginSuccess);
  yield takeLatest(constCommon.PUSH_LOGIN, pushLoginSaga);
  yield takeLatest(constCommon.PUSH_CHANGE_PASSWORD, pushChangePasswordSaga);
  yield takeLatest(types.LOGOUT, onLogoutSaga);
}

export default onLoginSaga();
