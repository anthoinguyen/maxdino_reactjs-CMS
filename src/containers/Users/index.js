import React, { Component, Fragment } from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactTable from "react-table";
import "react-table/react-table.css";
import * as AccountAction from "./action";
import * as CommonAction from "../../actions";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import { CardContent, Card, Button, Box, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RowDetail from "../../components/Card/RowComponent";
import ModalError from "../../components/Modal/ModalError";
import ModalDelete from "../../components/Modal/ModalDelete";
import AccountModal from "../../components/Modal/ModalAccount";
import styles from "./styles";

class User extends Component {
  componentWillMount() {
    if (!localStorage.getItem("jwtTokenAdmin")) {
      this.props.history.push("/login");
    }
  }

  onPushLogin = () => {
    this.props.commonActionCreators.pushLogin();
  };

  openModalDeleteAccount = data => {
    this.props.AccountActionCreators.openModalDeleteAccount(data);
  };

  closeModalDeleteAccount = () => {
    this.props.AccountActionCreators.closeModalDeleteAccount();
  };

  deleteAccount = () => {
    this.props.AccountActionCreators.deleteAccount(this.props.idDelete);
  };

  onCloseModalError = () => {
    this.props.AccountActionCreators.closeModalGetListAccountError();
  };

  openModalAddAccount = () => {
    this.props.AccountActionCreators.openModalAddAccount();
    this.props.AccountActionCreators.setEditAccount(null);
  };

  openModalEditAccount = id => {
    this.props.AccountActionCreators.openModalAddAccount();
    this.props.AccountActionCreators.setEditAccount(id);
  };

  onCloseModalAdd = () => {
    this.props.AccountActionCreators.closeModalAddAccount();
  };

  onSave = data => {
    let { accountEdit } = this.props;
    if (accountEdit && accountEdit.id) {
      this.props.AccountActionCreators.editAccount(data);
    } else {
      this.props.AccountActionCreators.addAccount(data);
    }
  };

  render() {
    let {
      classes,
      account,
      openModalDeleteAccount,
      openModalError,
      errors,
      openModalAddAccount,
      accountEdit,
      titleModal,
      loading,
      numberOfPages
    } = this.props;
    let columns = [
      {
        key: "id",
        Header: "ID",
        accessor: "id",
        sortable: true,
        width: 60
      },
      {
        key: "username",
        Header: "Username",
        accessor: "username",
        sortable: true
      },
      {
        key: "email",
        Header: "Email",
        accessor: "email",
        align: "right",
        sortable: true
      },
      {
        key: "admin",
        Header: "Role",
        accessor: "admin",
        width: 110,
        sortable: true,
        Cell: ({ value }) => (value === 1 || value === true ? "Admin" : "User"),
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : ""}
          >
            <option value="">Show All</option>
            <option value="1">Admin</option>
            <option value="0">User</option>
          </select>
        )
      },
      {
        key: "active",
        Header: "Status",
        accessor: "active",
        width: 110,
        sortable: true,
        Cell: ({ value }) =>
          value === 1 || value === true ? "Active" : "Inactive",
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : ""}
          >
            <option value="">Show All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        )
      },
      {
        key: "action",
        Header: "Action",
        accessor: "action",
        width: 100,
        sortable: false,
        filterable: false,
        Cell: data => {
          return (
            <Fragment>
              <button
                className="btn btn-icons btn-rounded btn-outline-primary btn-sm"
                onClick={() => this.openModalEditAccount(data.original)}
                style={{ marginRight: "5px", marginLeft: "10px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-icons btn-rounded btn-outline-danger btn-sm"
                onClick={() => this.openModalDeleteAccount(data.original.id)}
              >
                <i className="fa fa-trash-o"></i>
              </button>
            </Fragment>
          );
        }
      }
    ];
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <AccountModal
            openModalAdd={openModalAddAccount}
            onCloseModalAdd={this.onCloseModalAdd}
            onSave={this.onSave}
            titleModal={titleModal}
            initialValues={accountEdit}
          />
          <ModalDelete
            openModalDelete={openModalDeleteAccount}
            closeModalDelete={this.closeModalDeleteAccount}
            delete={this.deleteAccount}
          />
          <ModalError
            errors={errors}
            open={openModalError}
            onClose={this.onCloseModalError}
            pushLogin={this.onPushLogin}
          />
          <Box flexDirection="row-reverse" display="flex">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.button}
              onClick={this.openModalAddAccount}
            >
              <AddIcon className={classes.leftIcon} />
              CREATE
            </Button>
          </Box>
          <Card>
            <CardContent>
              <ReactTable
                className="-striped -highlight"
                defaultPageSize={10}
                data={account}
                columns={columns}
                pages={numberOfPages}
                filterable
                loading={loading}
                manual
                multiSort={false}
                onFetchData={state => {
                  this.props.AccountActionCreators.getListAccount(
                    state.page,
                    state.pageSize,
                    state.sorted,
                    state.filtered
                  );
                }}
                SubComponent={row => {
                  return (
                    <div className={classes.card}>
                      <RowDetail
                        title="Username: "
                        value={row.original.username}
                      />
                      <RowDetail title="Email: " value={row.original.email} />
                      <RowDetail
                        title="Role: "
                        value={row.original.admin === 1 ? "Admin" : "User"}
                      />
                      <RowDetail
                        title="Status: "
                        value={
                          row.original.active === 1 ? "Active" : "Inactive"
                        }
                      />
                      <RowDetail
                        title="Date created: "
                        value={row.original.created_at}
                      />
                      <RowDetail
                        title="Last date updated: "
                        value={row.original.updated_at}
                      />
                    </div>
                  );
                }}
              />
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    account: state.account.listAccount,
    openModalDeleteAccount: state.account.openModalDeleteAccount,
    idDelete: state.account.idDelete,
    errors: state.account.errors,
    openModalError: state.account.openModalError,
    openModalAddAccount: state.account.openModalAddAccount,
    accountEdit: state.account.accountEdit,
    titleModal: state.account.titleModal,
    loading: state.account.loading,
    numberOfPages: state.account.numberOfPages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    AccountActionCreators: bindActionCreators(AccountAction, dispatch),
    commonActionCreators: bindActionCreators(CommonAction, dispatch)
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withStyles(styles),
  withConnect
)(User);
