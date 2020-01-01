import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Clear";
import { connect } from "react-redux";
import { compose } from "redux";
import { Modal, Typography } from "@material-ui/core";
import styles from "./styles";

class ModalError extends Component {
  onClose = () => {
    let { errors } = this.props;
    this.props.onClose();
    if (
      errors.error &&
      (errors.errors[0].errorCode === 3000 ||
        errors.errors[0].errorCode === 3002 ||
        errors.errors[0].errorCode === 3004 ||
        errors.errors[0].errorCode === 8002)
    ) {
      this.props.pushLogin();
    }
  };

  render() {
    const { classes, errors, open } = this.props;

    if (errors) {
      var resultError = "";
      if (errors.error === true) {
        resultError = errors.errors.map((error, index) => {
          let listError = "";
          listError = (
            <Typography key={index} className={classes.name} gutterBottom>
              {error.errorMessage}
            </Typography>
          );
          return listError;
        });
      } else {
        resultError = (
          <Typography className={classes.name} gutterBottom>
            Server Error ! Please Again !
          </Typography>
        );
      }
    }
    return (
      <Modal open={open}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>Error</span>
            <CloseIcon className={classes.icon} onClick={this.onClose} />
          </div>
          <div className={classes.content}>{resultError}</div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withStyles(styles),
  withConnect
)(ModalError);
