import React, { Component, Fragment } from "react";
import { compose, bindActionCreators } from "redux";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import * as VideoAction from "./action";
import * as CommonAction from "../../actions";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import { CardContent, Card, Box, Button, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ModalError from "../../components/Modal/ModalError";
import VideoModal from "../../components/Modal/ModalVideo";
import RowDetail from "../../components/Card/RowComponent";
import ModalDelete from "../../components/Modal/ModalDelete";
import styles from "./styles";

class Video extends Component {
  componentWillMount() {
    if (!localStorage.getItem("jwtTokenAdmin")) {
      this.props.history.push("/login");
    }
  }

  onPushLogin = () => {
    this.props.commonActionCreators.pushLogin();
  };

  openModalDeleteVideo = data => {
    this.props.VideoActionCreators.openModalDeleteVideo(data);
  };

  closeModalDeleteVideo = () => {
    this.props.VideoActionCreators.closeModalDeleteVideo();
  };

  deleteVideo = () => {
    this.props.VideoActionCreators.deleteVideo(this.props.idDelete);
  };

  onCloseModalError = () => {
    this.props.VideoActionCreators.closeModalGetListVideoError();
  };

  openModalAddVideo = () => {
    this.props.VideoActionCreators.openModalAddVideo();
    this.props.VideoActionCreators.setEditVideo(null);
  };

  openModalEditVideo = id => {
    this.props.VideoActionCreators.openModalAddVideo();
    this.props.VideoActionCreators.setEditVideo(id);
  };

  onCloseModalAdd = () => {
    this.props.VideoActionCreators.closeModalAddVideo();
  };

  onSave = data => {
    let { videoEdit } = this.props;
    if (videoEdit && videoEdit.id) {
      this.props.VideoActionCreators.editVideo(data);
    } else {
      this.props.VideoActionCreators.addVideo(data);
    }
  };

  render() {
    const {
      video,
      classes,
      openModalDeleteVideo,
      openModalError,
      errors,
      openModalAddVideo,
      videoEdit,
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
        accessor: "username",
        sortable: true
      },
      {
        key: "title",
        Header: "Title",
        accessor: "title",
        sortable: true
      },
      {
        key: "link",
        Header: "Link Video",
        accessor: "link",
        sortable: true
      },
      {
        key: "image",
        Header: "Link Image",
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
                onClick={() => this.openModalEditVideo(data.original)}
                style={{ marginRight: "5px", marginLeft: "10px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-icons btn-rounded btn-outline-danger btn-sm"
                onClick={() => this.openModalDeleteVideo(data.original.id)}
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
          <VideoModal
            openModalAdd={openModalAddVideo}
            onCloseModalAdd={this.onCloseModalAdd}
            onSave={this.onSave}
            titleModal={titleModal}
            initialValues={videoEdit}
          />
          <ModalDelete
            openModalDelete={openModalDeleteVideo}
            closeModalDelete={this.closeModalDeleteVideo}
            delete={this.deleteVideo}
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
              onClick={this.openModalAddVideo}
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
                data={video}
                columns={columns}
                filterable
                pages={numberOfPages}
                loading={loading}
                manual
                multiSort={false}
                onFetchData={state => {
                  this.props.VideoActionCreators.getListVideo(
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
                        title="Link video: "
                        videoLink={row.original.link}
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
    video: state.video.listVideo,
    openModalDeleteVideo: state.video.openModalDeleteVideo,
    idDelete: state.video.idDelete,
    errors: state.video.errors,
    openModalError: state.video.openModalError,
    openModalAddVideo: state.video.openModalAddVideo,
    videoEdit: state.video.videoEdit,
    titleModal: state.video.titleModal,
    loading: state.video.loading,
    numberOfPages: state.video.numberOfPages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    VideoActionCreators: bindActionCreators(VideoAction, dispatch),
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
)(Video);
