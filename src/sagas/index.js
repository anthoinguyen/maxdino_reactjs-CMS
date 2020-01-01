import { all } from "redux-saga/effects";
import onLoginSaga from "../containers/Login/saga";
import getListVideoSaga from "../containers/Videos/saga";
import getListLearnSaga from "../containers/Learns/saga";
import getListAskSaga from "../containers/Asks/saga";
import getListAccountSaga from "../containers/Users/saga";
import getListStatisticSaga from "../containers/Dashboard/saga";
import changePasswordSaga from "../containers/ChangePassword/saga";
import createPasswordSaga from "../containers/CreatePasswordAdmin/saga";
import onRequestResetPassword from "../containers/RequestResetPassword/saga";
import onAcceptResetPassword from "../containers/AcceptResetPassword/saga";

function* rootSaga() {
  yield all([
    onLoginSaga,
    getListVideoSaga,
    getListLearnSaga,
    getListAskSaga,
    getListAccountSaga,
    getListStatisticSaga,
    changePasswordSaga,
    createPasswordSaga,
    onRequestResetPassword,
    onAcceptResetPassword
  ]);
}

export default rootSaga;
