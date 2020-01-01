import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { compose, bindActionCreators } from "redux";
import { Link as RouterLink } from "react-router-dom";
import { Link, Box, Grid, Button, CssBaseline, Typography, Container, withStyles } from "@material-ui/core";
import ModalError from "../../components/Modal/ModalError";
import renderTextField from "../../components/FormHelper/TextField";
import styles from "./styles";
import validate from "./validate";
import * as acceptAction from "./action";

class CreatePasswordAdmin extends Component {
  onAccept = data => {
    let { token } = this.props.match.params;
    let payload = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      token: token,
      username: data.username
    };
    this.props.acceptActionCreators.acceptCreatePassword(payload);
  };

  onClose = () => {
    this.props.acceptActionCreators.closeModalError();
  };

  render() {
    const {
      classes,
      handleSubmit,
      errors,
      open
    } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ModalError errors={errors} open={open} onClose={this.onClose} />
        <div className={classes.paper}>
          <Typography className={classes.title}>Create Account</Typography>
          <form className={classes.form} onSubmit={handleSubmit(this.onAccept)}>
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              name="username"
              label="Username"
              component={renderTextField}
            />
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              component={renderTextField}
            />
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
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
    errors: state.createPassword.errors,
    open: state.createPassword.open
  };
};

const mapDispatchToProps = dispatch => {
  return {
    acceptActionCreators: bindActionCreators(acceptAction, dispatch)
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReduxForm = reduxForm({
  form: "acceptCreatePassword",
  validate
});

export default compose(
  withStyles(styles),
  withReduxForm,
  withConnect
)(CreatePasswordAdmin);
