import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { compose, bindActionCreators } from "redux";
import { Link as RouterLink } from "react-router-dom";
import { Button, CssBaseline, Grid, Typography, Container, Link, Box, withStyles } from "@material-ui/core";
import ModalError from "../../components/Modal/ModalError";
import renderTextField from "../../components/FormHelper/TextField";
import styles from "./styles";
import validate from "./validate";
import * as requestAction from "./action";

class RequestResetPassword extends Component {
  onRequest = data => {
    this.props.requestActionCreators.requestResetPassword(data);
  };

  onClose = () => {
    this.props.requestActionCreators.closeModalError();
  };

  render() {
    const { classes, handleSubmit, errors, open } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ModalError errors={errors} open={open} onClose={this.onClose} />
        <div className={classes.paper}>
          <Typography className={classes.title}>Reset Password</Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(this.onRequest)}
          >
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              component={renderTextField}
            />
            <Grid container>
              <Box>
                <Link
                  to="/login"
                  underline="none"
                  component={RouterLink}
                  variant="body2"
                >
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
                </Link>
              </Box>
              <Box>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  className={classes.submit}
                >
                  Send
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
    errors: state.requestResetPassword.errors,
    open: state.requestResetPassword.open
  };
};
const mapDispatchToProps = dispatch => {
  return {
    requestActionCreators: bindActionCreators(requestAction, dispatch)
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReduxForm = reduxForm({
  form: "requestResetPassword",
  validate
});

export default compose(
  withStyles(styles),
  withReduxForm,
  withConnect
)(RequestResetPassword);
