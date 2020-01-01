import { call, takeLatest, put, delay } from "redux-saga/effects";
import * as api from "../../constants/config";
import * as types from "./constants";
import { showLoading, hideLoading } from "../../actions";
import { acceptCreatePasswordError } from "./action";
import { push } from "connected-react-router";
import axios from "axios";

const apiAcceptCreatePassword = async data => {
  let result = await axios({
    method: "POST",
    url: `${api.API_ADD_ACCOUNT_SUCCESS}`,
    data: data,
  });
  return result;
};

function* onAccept({ payload }) {
  try {
    let { data } = payload;
    yield put(showLoading());
    const resp = yield call(apiAcceptCreatePassword, data);
    const { status } = resp;
    if (status === 200) {
      yield delay(800);
      yield put(hideLoading());
      localStorage.removeItem("jwtTokenAdmin");
      yield put(push("/login"));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(acceptCreatePasswordError(error.response.data));
    } else {
      yield put(acceptCreatePasswordError(error));
    }
  }
}

function* createPasswordSaga() {
  yield takeLatest(types.ACCEPT_CREATE_PASSWORD, onAccept);
}

export default createPasswordSaga();
