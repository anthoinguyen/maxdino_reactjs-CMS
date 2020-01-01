import { call, takeLatest, put } from "redux-saga/effects";
import {
  getListAccountSuccess,
  getListAccountError,
  deleteAccountSuccess,
  addAccountSuccess,
  editAccountSuccess,
  closeModalAddAccount,
  closeModalDeleteAccount
} from "./action";
import { showLoading, hideLoading } from "../../actions";
import * as types from "./constant";
import * as api from "../../constants/config";
import axios from "axios";
import { push } from "connected-react-router";

const CancelToken = axios.CancelToken;
let cancel;

const apiGetListAccount = async data => {
  if (cancel !== undefined) cancel();

  let param = {
    limit: data.payload.pageSize,
    page: data.payload.page + 1,
    filter: data.payload.filtered,
    sortBy: data.payload.sorted.length > 0 ? data.payload.sorted[0].id : null,
    sort:
      data.payload.sorted.length > 0
        ? data.payload.sorted[0].desc === false
          ? "asc"
          : "desc"
        : null,
    // searchBy:
    //   data.payload.filtered.length > 0 ? data.payload.filtered[0].id : null,
    // keyword:
    //   data.payload.filtered.length > 0 ? data.payload.filtered[0].value : null
  };
  let result = await axios({
    method: "GET",
    url: `${api.API_GET_LIST_ACCOUNT}`,
    headers: {
      Authorization: `Bearer ${data.token}`
    },
    params: param,
    cancelToken: new CancelToken(c => (cancel = c))
  });
  return result;
};

function* getListAccount({ payload }) {
  try {
    let token = yield localStorage.getItem("jwtTokenAdmin");
    const resp = yield call(apiGetListAccount, { token, payload });
    const { data, status } = resp;
    if (status === 200) {
      yield put(getListAccountSuccess(data.data));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(getListAccountError(error.response.data));
    } else {
      yield put(getListAccountError(error));
    }
  }
}

const apiDeleteAccount = async idAccount => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let result = await axios({
    method: "DELETE",
    url: `${api.API_DELETE_ACCOUNT}/${idAccount}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
};

function* deleteAccount({ payload }) {
  try {
    let idAccount = payload.data;
    yield put(showLoading());
    let myId = Number(localStorage.getItem("id"));
    const resp = yield call(apiDeleteAccount, idAccount);
    const { status } = resp;
    if (status === 200 && myId === idAccount) {
      yield put(hideLoading());
      yield put(closeModalDeleteAccount());
      localStorage.removeItem("jwtTokenAdmin");
      localStorage.removeItem("id");
      yield put(push("/login"));
    } else if (status === 200) {
      yield put(hideLoading());
      yield put(closeModalDeleteAccount());
      yield put(deleteAccountSuccess(idAccount));
    }
  } catch (error) {
    yield put(closeModalDeleteAccount());
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(getListAccountError(error.response.data));
    } else {
      yield put(getListAccountError(error));
    }
  }
}

const apiAddAccount = async newAccount => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let result = await axios({
    method: "POST",
    url: `${api.API_ADD_ACCOUNT}`,
    data: newAccount,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
};

function* addAccount({ payload }) {
  try {
    let newAccount = payload.data;
    yield put(showLoading());
    const resp = yield call(apiAddAccount, newAccount);
    const { data, status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      yield put(closeModalAddAccount());
      yield put(addAccountSuccess(data));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(getListAccountError(error.response.data));
    } else {
      yield put(getListAccountError(error));
    }
  }
}

const apiEditAccount = async accountEdit => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let result = await axios({
    method: "PUT",
    url: `${api.API_EDIT_ACCOUNT}/${accountEdit.id}`,
    data: accountEdit,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
};

function* editAccount({ payload }) {
  try {
    let accountEdit = payload.data;
    yield put(showLoading());
    let myId = Number(localStorage.getItem("id"));
    const resp = yield call(apiEditAccount, accountEdit);
    const { data, status } = resp;
    if (status === 200 && myId === accountEdit.id) {
      yield put(hideLoading());
      yield put(closeModalAddAccount());
      localStorage.removeItem("jwtTokenAdmin");
      localStorage.removeItem("id");
      yield put(push("/login"));
    } else if (status === 200) {
      yield put(hideLoading());
      yield put(closeModalAddAccount());
      yield put(editAccountSuccess(data));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(getListAccountError(error.response.data));
    } else {
      yield put(getListAccountError(error));
    }
  }
}

function* getListAccountSaga() {
  yield takeLatest(types.GET_LIST_ACCOUNT, getListAccount);
  yield takeLatest(types.DELETE_ACCOUNT, deleteAccount);
  yield takeLatest(types.ADD_ACCOUNT, addAccount);
  yield takeLatest(types.EDIT_ACCOUNT, editAccount);
}

export default getListAccountSaga();
