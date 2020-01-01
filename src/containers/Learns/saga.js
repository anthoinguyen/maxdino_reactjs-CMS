import { call, takeLatest, put } from "redux-saga/effects";
import {
  getListLearnSuccess,
  getListLearnError,
  deleteLearnSuccess,
  addLearnSuccess,
  editLearnSuccess,
  closeModalAddLearn,
  closeModalDeleteLearn
} from "./action";
import { showLoading, hideLoading } from "../../actions";
import * as types from "./constant";
import * as api from "../../constants/config";
import axios from "axios";

const CancelToken = axios.CancelToken;
let cancel;

const apiGetListLearn = async data => {
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
    url: `${api.API_GET_LIST_LEARN}`,
    headers: {
      Authorization: `Bearer ${data.token}`
    },
    params: param,
    cancelToken: new CancelToken(c => (cancel = c))
  });
  return result;
};

function* getListLearn({ payload }) {
  try {
    let token = yield localStorage.getItem("jwtTokenAdmin");
    const resp = yield call(apiGetListLearn, { token, payload });
    const { data, status } = resp;
    if (status === 200) {
      yield put(getListLearnSuccess(data.data));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(getListLearnError(error.response.data));
    } else {
      yield put(getListLearnError(error));
    }
  }
}

const apiDeleteLearn = async idLearn => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let result = await axios({
    method: "DELETE",
    url: `${api.API_DELETE_LEARN}/${idLearn}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
};

function* deleteLearn({ payload }) {
  try {
    let idLearn = payload.data;
    yield put(showLoading());
    const resp = yield call(apiDeleteLearn, idLearn);
    const { status } = resp;
    if (status === 200) {
      yield put(closeModalDeleteLearn());
      yield put(deleteLearnSuccess(idLearn));
      yield put(hideLoading());
    }
  } catch (error) {
    yield put(hideLoading());
    yield put(closeModalDeleteLearn());
    if (error.response && error.response.data.error) {
      yield put(getListLearnError(error.response.data));
    } else {
      yield put(getListLearnError(error));
    }
  }
}

const apiAddLearn = async newLearn => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let formData = new FormData();
  formData.append("learnTitle", newLearn.title);
  formData.append("learnContent", newLearn.content);
  formData.append("learnPriority", newLearn.priority);
  formData.append("learnImage", newLearn.imageLearn);
  let result = await axios({
    method: "POST",
    url: `${api.API_ADD_LEARN}`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data"
    }
  });
  return result;
};

function* addLearn({ payload }) {
  try {
    let newLearn = payload.data;
    yield put(showLoading());
    const resp = yield call(apiAddLearn, newLearn);
    const { data, status } = resp;
    if (status === 200) {
      yield put(addLearnSuccess(data));
      yield put(closeModalAddLearn());
      yield put(hideLoading());
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(getListLearnError(error.response.data));
    } else {
      yield put(getListLearnError(error));
    }
  }
}

const apiEditLearn = async learnEdit => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let formData = new FormData();
  formData.append("learnTitle", learnEdit.title);
  formData.append("learnContent", learnEdit.content);
  formData.append("learnPriority", learnEdit.priority);
  if (learnEdit && learnEdit.imageLearn) {
    formData.append("learnImage", learnEdit.imageLearn);
  }

  let result = await axios({
    method: "POST",
    url: `${api.API_EDIT_LEARN}/${learnEdit.id}`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data"
    }
  });
  return result;
};

function* editLearn({ payload }) {
  try {
    let learnEdit = payload.data;
    yield put(showLoading());
    const resp = yield call(apiEditLearn, learnEdit);
    const { data, status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      yield put(closeModalAddLearn());
      yield put(editLearnSuccess(data));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(getListLearnError(error.response.data));
    } else {
      yield put(getListLearnError(error));
    }
  }
}

function* getListLearnSaga() {
  yield takeLatest(types.GET_LIST_LEARN, getListLearn);
  yield takeLatest(types.DELETE_LEARN, deleteLearn);
  yield takeLatest(types.ADD_LEARN, addLearn);
  yield takeLatest(types.EDIT_LEARN, editLearn);
}

export default getListLearnSaga();
