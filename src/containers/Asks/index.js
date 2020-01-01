import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as AskAction from "./action";
import * as CommonAction from "../../actions";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import { CardContent, Card, withStyles } from "@material-ui/core";
import AskModal from "../../components/Modal/ModalAsk";
import ModalError from "../../components/Modal/ModalError";
import RowDetail from "../../components/Card/RowComponent";
import ModalDelete from "../../components/Modal/ModalDelete";
import styles from "./styles";

class Ask extends Component {
  componentWillMount() {
    if (!localStorage.getItem("jwtTokenAdmin")) {
      this.props.history.push("/login");
    }
  }

  onPushLogin = () => {
    this.props.commonActionCreators.pushLogin();
  };

  openModalDeleteAsk = data => {
    this.props.AskActionCreators.openModalDeleteAsk(data);
  };

  closeModalDeleteAsk = () => {
    this.props.AskActionCreators.closeModalDeleteAsk();
  };

  deleteAsk = () => {
    this.props.AskActionCreators.deleteAsk(this.props.idDelete);
  };

  onCloseModalError = () => {
    this.props.AskActionCreators.closeModalGetListAskError();
  };

  openModalEditAsk = id => {
    this.props.AskActionCreators.openModalEditAsk();
    this.props.AskActionCreators.setEditAsk(id);
  };

  onCloseModalEdit = () => {
    this.props.AskActionCreators.closeModalEditAsk();
  };

  onSave = data => {
    let { askEdit } = this.props;
    if (askEdit && askEdit.id) {
      this.props.AskActionCreators.editAsk(data);
    }
  };

  render() {
    const {
      ask,
      classes,
      openModalDeleteAsk,
      openModalError,
      errors,
      loading,
      openModalEditAsk,
      askEdit,
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
        Header: "Author",
        accessor: "username",
        sortable: true
      },
      {
        key: "content",
        Header: "Content",
        accessor: "content",
        sortable: true
      },
      {
        key: "image",
        Header: "Image",
        accessor: "image",
        sortable: false,
        filterable: false
      },
      {
        key: "action",
        Header: "Action",
        accessor: "action",
        width: 100,
        align: "left",
        sortable: false,
        filterable: false,
        Cell: data => {
          return (
            <Fragment>
              <button
                className="btn btn-icons btn-rounded btn-outline-primary btn-sm"
                onClick={() => this.openModalEditAsk(data.original)}
                style={{ marginRight: "5px", marginLeft: "10px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-icons btn-rounded btn-outline-danger btn-sm"
                onClick={() => this.openModalDeleteAsk(data.original.id)}
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
          <AskModal
            openModalEdit={openModalEditAsk}
            onCloseModalEdit={this.onCloseModalEdit}
            onSave={this.onSave}
            initialValues={askEdit}
          />
          <ModalDelete
            openModalDelete={openModalDeleteAsk}
            closeModalDelete={this.closeModalDeleteAsk}
            delete={this.deleteAsk}
          />
          <ModalError
            errors={errors}
            open={openModalError}
            onClose={this.onCloseModalError}
            pushLogin={this.onPushLogin}
          />
          <Card>
            <CardContent>
              <ReactTable
                className="-striped -highlight"
                defaultPageSize={10}
                data={ask}
                columns={columns}
                pages={numberOfPages}
                filterable
                loading={loading}
                manual
                multiSort={false}
                onFetchData={state => {
                  this.props.AskActionCreators.getListAsk(
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
                        title="Author: "
                        value={row.original.username}
                      />
                      <RowDetail
                        title="Content: "
                        value={row.original.content}
                      />
                      <RowDetail link={row.original.image} />
                      <RowDetail
                        title="Link Image: "
                        fullLink={row.original.image}
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
    ask: state.ask.listAsk,
    openModalDeleteAsk: state.ask.openModalDeleteAsk,
    idDelete: state.ask.idDelete,
    errors: state.ask.errors,
    openModalError: state.ask.openModalError,
    openModalEditAsk: state.ask.openModalEditAsk,
    askEdit: state.ask.askEdit,
    loading: state.ask.loading,
    numberOfPages: state.ask.numberOfPages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    AskActionCreators: bindActionCreators(AskAction, dispatch),
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
)(Ask);
