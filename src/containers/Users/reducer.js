import * as types from "./constant";

const initialState = {
  listAccount: [],
  errors: [],
  openModalDeleteAccount: false,
  idDelete: "",
  openModalError: false,
  openModalAddAccount: false,
  accountEdit: [],
  titleModal: "",
  loading: false,
  numberOfPages: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_ACCOUNT: {
      return {
        ...state,
        listAccount: [],
        errors: [],
        openModalError: false,
        loading: true,
        numberOfPages: 0
      };
    }
    case types.GET_LIST_ACCOUNT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listAccount: data.data,
        loading: false,
        numberOfPages: data.last_page
      };
    }
    case types.GET_LIST_ACCOUNT_ERROR: {
      let { error } = action.payload;
      return {
        ...state,
        errors: error,
        openModalError: true
      };
    }
    case types.OPEN_MODAL_DELETE_ACCOUNT: {
      let { data } = action.payload;
      return {
        ...state,
        openModalDeleteAccount: true,
        idDelete: data
      };
    }
    case types.CLOSE_MODAL_DELETE_ACCOUNT: {
      return {
        ...state,
        openModalDeleteAccount: false,
        idDelete: ""
      };
    }
    case types.DELETE_ACCOUNT: {
      return {
        ...state
      };
    }
    case types.DELETE_ACCOUNT_SUCCESS: {
      let { data } = action.payload;
      return {
        ...state,
        listAccount: state.listAccount.filter(item => item.id !== data)
      };
    }
    case types.CLOSE_GET_LIST_ACCOUNT_ERROR_MODAL: {
      return {
        ...state,
        openModalError: false
      };
    }
    case types.OPEN_MODAL_ADD_ACCOUNT: {
      return {
        ...state,
        openModalAddAccount: true
      };
    }
    case types.CLOSE_MODAL_ADD_ACCOUNT: {
      return {
        ...state,
        openModalAddAccount: false,
        accountEdit: []
      };
    }
    case types.ADD_ACCOUNT: {
      return {
        ...state
      };
    }
    case types.ADD_ACCOUNT_SUCCESS: {
      const newAccount = action.payload.data.data;
      let dataNewAccount = [newAccount].concat(state.listAccount);
      return {
        ...state,
        listAccount: dataNewAccount
      };
    }
    case types.SET_EDIT_ACCOUNT: {
      const { data } = action.payload;
      return {
        ...state,
        titleModal: data ? "Edit Account" : "Add Account",
        accountEdit: data
          ? {
              ...data,
              admin: data.admin === 1 || data.admin === true ? 1 : 0
            }
          : null
      };
    }
    case types.EDIT_ACCOUNT: {
      return {
        ...state
      };
    }
    case types.EDIT_ACCOUNT_SUCCESS: {
      const { data } = action.payload.data;
      console.log("TCL: reducer -> data", data);
      const { listAccount } = state;
      const index = listAccount.findIndex(item => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listAccount.slice(0, index),
          data,
          ...listAccount.slice(index + 1)
        ];
        return {
          ...state,
          listAccount: newList
        };
      }
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default reducer;
