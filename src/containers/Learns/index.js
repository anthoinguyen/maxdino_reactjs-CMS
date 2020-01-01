import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as LearnAction from "./action";
import * as CommonAction from "../../actions";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import { CardContent, Card, Box, Button, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ModalError from "../../components/Modal/ModalError";
import LearnModal from "../../components/Modal/ModalLearn";
import RowDetail from "../../components/Card/RowComponent";
import ModalDelete from "../../components/Modal/ModalDelete";
import styles from "./styles";

class Learn extends Component {
  componentWillMount() {
    if (!localStorage.getItem("jwtTokenAdmin")) {
      this.props.history.push("/login");
    }
  }

  onPushLogin = () => {
    this.props.commonActionCreators.pushLogin();
  };

  openModalDeleteLearn = data => {
    this.props.LearnActionCreators.openModalDeleteLearn(data);
  };

  closeModalDeleteLearn = () => {
    this.props.LearnActionCreators.closeModalDeleteLearn();
  };

  deleteLearn = () => {
    this.props.LearnActionCreators.deleteLearn(this.props.idDelete);
  };

  onCloseModalError = () => {
    this.props.LearnActionCreators.closeModalGetListLearnError();
  };

  openModalAddLearn = () => {
    this.props.LearnActionCreators.openModalAddLearn();
    this.props.LearnActionCreators.setEditLearn(null);
  };

  openModalEditLearn = id => {
    this.props.LearnActionCreators.openModalAddLearn();
    this.props.LearnActionCreators.setEditLearn(id);
  };

  onCloseModalAdd = () => {
    this.props.LearnActionCreators.closeModalAddLearn();
  };

  onSave = data => {
    let { learnEdit } = this.props;
    if (learnEdit && learnEdit.id) {
      this.props.LearnActionCreators.editLearn(data);
    } else {
      this.props.LearnActionCreators.addLearn(data);
    }
  };

  render() {
    const {
      learn,
      classes,
      openModalDeleteLearn,
      openModalError,
      errors,
      openModalAddLearn,
      learnEdit,
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
        Header: "Author",
        id: "username",
        accessor: "username",
        sortable: true
      },
      {
        key: "title",
        Header: "Tilte",
        id: "title",
        accessor: "title",
        sortable: true
      },
      {
        key: "content",
        Header: "Content",
        id: "content",
        accessor: "content",
        sortable: true
      },
      {
        key: "image",
        Header: "Image",
        id: "image",
        accessor: "image",
        sortable: false,
        filterable: false
      },
      {
        key: "priority",
        Header: "Priority",
        accessor: "priority",
        sortable: true,
        width: 70
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
                onClick={() => this.openModalEditLearn(data.original)}
                style={{ marginRight: "5px", marginLeft: "10px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-icons btn-rounded btn-outline-danger btn-sm"
                onClick={() => this.openModalDeleteLearn(data.original.id)}
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
          <LearnModal
            openModalAdd={openModalAddLearn}
            onCloseModalAdd={this.onCloseModalAdd}
            onSave={this.onSave}
            titleModal={titleModal}
            initialValues={learnEdit}
          />
          <ModalDelete
            openModalDelete={openModalDeleteLearn}
            closeModalDelete={this.closeModalDeleteLearn}
            delete={this.deleteLearn}
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
              onClick={this.openModalAddLearn}
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
                data={learn}
                columns={columns}
                filterable
                pages={numberOfPages}
                loading={loading}
                manual
                multiSort={false}
                onFetchData={state => {
                  this.props.LearnActionCreators.getListLearn(
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
                        title="Priority: "
                        value={row.original.priority}
                      />
                      <RowDetail title="Title: " value={row.original.title} />
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
    learn: state.learn.listLearn,
    openModalDeleteLearn: state.learn.openModalDeleteLearn,
    idDelete: state.learn.idDelete,
    errors: state.learn.errors,
    openModalError: state.learn.openModalError,
    openModalAddLearn: state.learn.openModalAddLearn,
    learnEdit: state.learn.learnEdit,
    titleModal: state.learn.titleModal,
    loading: state.learn.loading,
    numberOfPages: state.learn.numberOfPages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    LearnActionCreators: bindActionCreators(LearnAction, dispatch),
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
)(Learn);
