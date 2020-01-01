export const HOST = "http://localhost/maxdino_backend/public/api";
// export const HOST = "https://maxdino-laravel.herokuapp.com/api";
//export const HOST = "https://maxdino.koreacentral.cloudapp.azure.com/api";

export const IMAGE_LINK = "http://localhost/maxdino_backend/public/";

export const API_LOGIN = `${HOST}/auth/login`;
export const API_LOGOUT = `${HOST}/auth/logout`;
export const API_CHANGE_PASSWORD = `${HOST}/auth/change-password`;
export const API_REQUEST_RESET_PASSWORD = `${HOST}/auth/request/reset-password`;
export const API_ACCEPT_RESET_PASSWORD = `${HOST}/auth/accept/reset-password`;

export const API_GET_LIST_STATISTIC = `${HOST}/admin/statistic`;

export const API_GET_LIST_ASK = `${HOST}/ask/all`;
export const API_DELETE_ASK = `${HOST}/ask`;
export const API_EDIT_ASK = `${HOST}/ask`;


export const API_GET_LIST_ACCOUNT = `${HOST}/admin/all-user`;
export const API_DELETE_ACCOUNT = `${HOST}/admin`;
export const API_ADD_ACCOUNT = `${HOST}/admin/request/create-user`;
export const API_ADD_ACCOUNT_SUCCESS = `${HOST}/admin/accept/create-user`;
export const API_EDIT_ACCOUNT = `${HOST}/admin`;

export const API_GET_LIST_VIDEO = `${HOST}/video/all`;
export const API_DELETE_VIDEO = `${HOST}/video`;
export const API_ADD_VIDEO = `${HOST}/video`;
export const API_EDIT_VIDEO = `${HOST}/video`;

export const API_GET_LIST_LEARN = `${HOST}/learn/all`;
export const API_DELETE_LEARN = `${HOST}/learn`;
export const API_ADD_LEARN = `${HOST}/learn`;
export const API_EDIT_LEARN = `${HOST}/learn`;
