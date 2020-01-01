import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { compose, bindActionCreators } from "redux";
import { Button, CssBaseline, Typography, Grid, Box, Container, withStyles } from "@material-ui/core";
import ModalError from "../../components/Modal/ModalError";
import renderTextField from "../../components/FormHelper/TextField";
import styles from "./styles";
import validate from "./validate";
import * as CommonAction from "../../actions";
import * as ChangePasswordAction from "./action";

class ChangePassword extends Component {
  componentWillMount() {
    if (!localStorage.getItem("jwtTokenAdmin")) {
      this.props.history.push("/login");
    }
  }

  onClose = () => {
    this.props.ChangePasswordActionCreators.closeModalError();
  };

  onChangePassword = data => {
    this.props.ChangePasswordActionCreators.changePassword(data);
  };

  onCancel = () => {
    this.props.ChangePasswordActionCreators.cancelChangePassword();
  };

  onPushLogin = () => {
    this.props.commonActionCreators.pushLogin();
  };

  render() {
    const { classes, handleSubmit, errors, open } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ModalError
          errors={errors}
          open={open}
          onClose={this.onClose}
          pushLogin={this.onPushLogin}
        />
        <div className={classes.paper}>
          <Typography className={classes.title}>Change Password</Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(this.onChangePassword)}
          >
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              name="currentPassword"
              label="Current Password"
              type="password"
              component={renderTextField}
            />
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              component={renderTextField}
            />
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              name="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              component={renderTextField}
            />
            <Grid container>
              <Box>
                <Button
                  type="button"
                  variant="contained"
                  size="large"
                  color="default"
                  className={classes.cancel}
                  onClick={this.onCancel}
                >
                  Cancel
                </Button>
              </Box>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className={classes.submit}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.changePassword.errors,
    open: state.changePassword.open
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ChangePasswordActionCreators: bindActionCreators(
      ChangePasswordAction,
      dispatch
    ),
    commonActionCreators: bindActionCreators(CommonAction, dispatch)
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReduxForm = reduxForm({
  form: "changePassword",
  validate
});

export default compose(
  withStyles(styles),
  withReduxForm,
  withConnect
)(ChangePassword);
