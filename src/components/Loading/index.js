import React, { Component } from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import loading from "./../../assets/img/loading.gif";

class Loading extends Component {
  render() {
    const { classes, showLoading } = this.props;
    let result = null;
    if (showLoading) {
      result = (
        <div className={classes.globalLoading}>
          <img src={loading} alt="loading" className={classes.icon} />
        </div>
      );
    }
    return result;
  }
}

const mapStateToProps = state => {
  return {
    showLoading: state.ui.showLoading,
  };
};

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withStyles(styles),
  withConnect,
)(Loading);
