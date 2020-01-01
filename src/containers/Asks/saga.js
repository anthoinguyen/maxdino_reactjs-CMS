import { call, takeLatest, put } from "redux-saga/effects";
import {
  getListAskSuccess,
  getListAskError,
  deleteAskSuccess,
  closeModalDeleteAsk,
  editAskSuccess,
  closeModalEditAsk
} from "./action";
import { showLoading, hideLoading } from "../../actions";
import * as types from "./constant";
import * as api from "../../constants/config";
import axios from "axios";

const CancelToken = axios.CancelToken;
let cancel;

const apiGetListAsk = async data => {
  if (cancel !== undefined) cancel();
  let param = {
    limit: data.payload.pageSize,
    offset: data.payload.page * data.payload.pageSize,
    fieldSort:
      data.payload.sorted.length > 0 ? data.payload.sorted[0].id : null,
    typeSort:
      data.payload.sorted.length > 0
        ? data.payload.sorted[0].desc === false
          ? "asc"
          : "desc"
        : null,
    fieldSearch:
      data.payload.filtered.length > 0 ? data.payload.filtered[0].id : null,
    keySearch:
      data.payload.filtered.length > 0 ? data.payload.filtered[0].value : null
  };
  let result = await axios({
    method: "GET",
    url: `${api.API_GET_LIST_ASK}`,
    headers: {
      Authorization: `Bearer ${data.token}`
    },
    params: param,
    cancelToken: new CancelToken(c => (cancel = c))
  });
  return result;
};

function* getListAsk({ payload }) {
  try {
    let token = yield localStorage.getItem("jwtTokenAdmin");
    const resp = yield call(apiGetListAsk, { token, payload });
    const { data, status } = resp;
    if (status === 200) {
      yield put(getListAskSuccess(data.data));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(getListAskError(error.response.data));
    } else {
      yield put(getListAskError(error));
    }
  }
}

const apiDeleteAsk = async idAsk => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let result = await axios({
    method: "DELETE",
    url: `${api.API_DELETE_ASK}/${idAsk}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
};

function* deleteAsk({ payload }) {
  try {
    let idAsk = payload.data;
    yield put(showLoading());
    const resp = yield call(apiDeleteAsk, idAsk);
    const { status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      yield put(closeModalDeleteAsk());
      yield put(deleteAskSuccess(idAsk));
    }
  } catch (error) {
    yield put(closeModalDeleteAsk());
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(getListAskError(error.response.data));
    } else {
      yield put(getListAskError(error));
    }
  }
}

const apiEditAsk = async askEdit => {  
  let token = await localStorage.getItem("jwtTokenAdmin");
  let formData = new FormData();
  formData.append("askContent", askEdit.content);
  if (askEdit && askEdit.imageAsk) {
    formData.append("askImage", askEdit.imageAsk);
  }

  let result = await axios({
    method: "POST",
    url: `${api.API_EDIT_ASK}/${askEdit.id}`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data"
    }
  });
  return result;
};

function* editAsk({ payload }) {
  try {
    let askEdit = payload.data;
    yield put(showLoading());
    const resp = yield call(apiEditAsk, askEdit);
    const { data, status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      yield put(closeModalEditAsk());
      yield put(editAskSuccess(data));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(getListAskError(error.response.data));
    } else {
      yield put(getListAskError(error));
    }
  }
}

function* getListAskSaga() {
  yield takeLatest(types.GET_LIST_ASK, getListAsk);
  yield takeLatest(types.DELETE_ASK, deleteAsk);
  yield takeLatest(types.EDIT_ASK, editAsk);
}

export default getListAskSaga();
