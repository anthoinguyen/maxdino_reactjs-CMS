import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Clear";
import { compose } from "redux";
import { Modal } from "@material-ui/core";
import styles from "./styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Box, MenuItem } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import renderTextField from "../../FormHelper/TextField";
import renderSelectField from "../../FormHelper/Select";

import validate from "./validate";

class AccountModal extends Component {
  onClose = () => {
    const { reset } = this.props;
    this.props.onCloseModalAdd();
    reset();
  };

  handleSubmitForm = data => {
    this.props.onSave(data);
  };

  componentWillUnmount = () => {
    const { reset } = this.props;
    reset();
  };

  render() {
    let {
      classes,
      handleSubmit,
      openModalAdd,
      titleModal,
      initialValues
    } = this.props;
    let disableEmail,
      disableStatus = false;
    if (initialValues && initialValues.email) {
      disableEmail = true;
    } else {
      disableStatus = true;
    }
    return (
      <Modal open={openModalAdd}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>{titleModal}</span>
            <CloseIcon className={classes.icon} onClick={this.onClose} />
          </div>
          <div className={classes.content}>
            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
              <Grid container>
                <Field
                  id="username"
                  label="Username"
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  name="username"
                  component={renderTextField}
                />
                <Field
                  id="email"
                  label="Email"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  name="email"
                  component={renderTextField}
                  disabled={disableEmail}
                />
                <Field
                  name="admin"
                  id="Admin"
                  component={renderSelectField}
                  fullWidth
                  label="Role"
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={0}>User</MenuItem>
                </Field>
                <Field
                  name="active"
                  id="Active"
                  component={renderSelectField}
                  fullWidth
                  label="Status"
                  disabled={disableStatus}
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </Field>

                <Grid item md={12}>
                  <Box display="flex" flexDirection="row-reverse" mt={2}>
                    <Box ml={1}>
                      <Button
                        className={classes.buttonSave}
                        variant="contained"
                        type="submit"
                      >
                        Save
                      </Button>
                    </Box>
                    <Button
                      className={classes.button}
                      variant="contained"
                      onClick={this.onClose}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

let withReduxForm = reduxForm({
  form: "account",
  enableReinitialize: true,
  validate
});

export default compose(
  withStyles(styles),
  withReduxForm
)(AccountModal);
