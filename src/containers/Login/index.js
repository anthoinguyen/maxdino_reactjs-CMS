import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { compose, bindActionCreators } from "redux";
import { Link as RouterLink } from "react-router-dom";
import { Button, CssBaseline, Grid, Container, Link, withStyles } from "@material-ui/core";
import ModalError from "../../components/Modal/ModalError";
import renderTextField from "../../components/FormHelper/TextField";
import styles from "./styles";
import validate from "./validate";
import * as loginAction from "./action";
import logo from "../../assets/img/maxdino_logo.png";

class Login extends Component {
  componentWillMount() {
    if (localStorage.getItem("jwtTokenAdmin")) {
      this.props.history.push("/admin");
    }
  }

  onLogin = data => {
    this.props.loginActionCreators.login(data);
  };

  onClose = () => {
    this.props.loginActionCreators.closeModalError();
  };

  render() {
    const { classes, handleSubmit, errors, open } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ModalError errors={errors} open={open} onClose={this.onClose} />
        <div className={classes.paper}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          <form onSubmit={handleSubmit(this.onLogin)}>
            <Field
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link
                to="/request/reset-password"
                component={RouterLink}
                variant="body2"
              >
                Forgot password ?
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.login.errors,
    open: state.login.open
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginActionCreators: bindActionCreators(loginAction, dispatch)
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReduxForm = reduxForm({
  form: "login",
  validate
});

export default compose(
  withStyles(styles),
  withReduxForm,
  withConnect
)(Login);
