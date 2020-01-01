import { call, takeLatest, put } from "redux-saga/effects";
import {
  getListVideoSuccess,
  getListVideoError,
  deleteVideoSuccess,
  addVideoSuccess,
  editVideoSuccess,
  closeModalAddVideo,
  closeModalDeleteVideo
} from "./action";
import { showLoading, hideLoading } from "../../actions";
import * as types from "./constant";
import * as api from "../../constants/config";
import axios from "axios";

const CancelToken = axios.CancelToken;
let cancel;

const apiGetListVideo = async data => {
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
    url: `${api.API_GET_LIST_VIDEO}`,
    headers: {
      Authorization: `Bearer ${data.token}`
    },
    params: param,
    cancelToken: new CancelToken(c => (cancel = c))
  });
  return result;
};

function* getListVideo({ payload }) {
  try {
    let token = yield localStorage.getItem("jwtTokenAdmin");
    const resp = yield call(apiGetListVideo, { payload, token });
    const { data, status } = resp;
    if (status === 200) {
      yield put(getListVideoSuccess(data.data));
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      yield put(getListVideoError(error.response.data));
    } else {
      yield put(getListVideoError(error));
    }
  }
}

const apiDeleteVideo = async idVideo => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let result = await axios({
    method: "DELETE",
    url: `${api.API_DELETE_VIDEO}/${idVideo}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
};

function* deleteVideo({ payload }) {
  try {
    let idVideo = payload.data;
    yield put(showLoading());
    const resp = yield call(apiDeleteVideo, idVideo);
    const { status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      yield put(closeModalDeleteVideo());
      yield put(deleteVideoSuccess(idVideo));
    }
  } catch (error) {
    yield put(hideLoading());
    yield put(closeModalDeleteVideo());
    if (error.response && error.response.data.error) {
      yield put(getListVideoError(error.response.data));
    } else {
      yield put(getListVideoError(error));
    }
  }
}

const apiAddVideo = async newVideo => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let formData = new FormData();
  formData.append("videoTitle", newVideo.title);
  formData.append("videoLink", newVideo.link);
  formData.append("videoPriority", newVideo.priority);
  formData.append("videoImage", newVideo.imageVideo);
  let result = await axios({
    method: "POST",
    url: `${api.API_ADD_VIDEO}`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data"
    }
  });
  return result;
};

function* addVideo({ payload }) {
  try {
    let newVideo = payload.data;
    yield put(showLoading());
    const resp = yield call(apiAddVideo, newVideo);
    const { data, status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      yield put(closeModalAddVideo());
      yield put(addVideoSuccess(data));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(getListVideoError(error.response.data));
    } else {
      yield put(getListVideoError(error));
    }
  }
}

const apiEditVideo = async videoEdit => {
  let token = await localStorage.getItem("jwtTokenAdmin");
  let formData = new FormData();
  formData.append("videoTitle", videoEdit.title);
  formData.append("videoLink", videoEdit.link);
  formData.append("videoPriority", videoEdit.priority);
  if (videoEdit && videoEdit.imageVideo) {
    formData.append("videoImage", videoEdit.imageVideo);
  }
  let result = await axios({
    method: "POST",
    url: `${api.API_EDIT_VIDEO}/${videoEdit.id}`,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data"
    }
  });
  return result;
};

function* editVideo({ payload }) {
  try {
    let videoEdit = payload.data;
    yield put(showLoading());
    const resp = yield call(apiEditVideo, videoEdit);
    const { data, status } = resp;
    if (status === 200) {
      yield put(hideLoading());
      yield put(closeModalAddVideo());
      yield put(editVideoSuccess(data));
    }
  } catch (error) {
    yield put(hideLoading());
    if (error.response && error.response.data.error) {
      yield put(getListVideoError(error.response.data));
    } else {
      yield put(getListVideoError(error));
    }
  }
}

function* getListVideoSaga() {
  yield takeLatest(types.GET_LIST_VIDEO, getListVideo);
  yield takeLatest(types.DELETE_VIDEO, deleteVideo);
  yield takeLatest(types.ADD_VIDEO, addVideo);
  yield takeLatest(types.EDIT_VIDEO, editVideo);
}

export default getListVideoSaga();
