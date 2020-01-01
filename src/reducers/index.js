import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";
import uiReducer from "./uiReducer";
import loginReducer from "../containers/Login/reducer";
import videoReducer from "../containers/Videos/reducer";
import learnReducer from "../containers/Learns/reducer";
import askReducer from "../containers/Asks/reducer";
import accountReducer from "../containers/Users/reducer";
import statisticReducer from "../containers/Dashboard/reducer";
import changePasswordReducer from "../containers/ChangePassword/reducer";
import createPasswordReducer from "../containers/CreatePasswordAdmin/reducer";
import RequestResetPasswordReducer from "../containers/RequestResetPassword/reducer";
import AcceptResetPasswordReducer from "../containers/AcceptResetPassword/reducer";

export default history =>
  combineReducers({
    form: formReducer,
    router: connectRouter(history),
    login: loginReducer,
    ui: uiReducer,
    video: videoReducer,
    learn: learnReducer,
    ask: askReducer,
    account: accountReducer,
    statistic: statisticReducer,
    changePassword: changePasswordReducer,
    createPassword: createPasswordReducer,
    requestResetPassword: RequestResetPasswordReducer,
    acceptResetPassword: AcceptResetPasswordReducer
  });
