import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Clear";
import { compose } from "redux";
import { Modal } from "@material-ui/core";
import styles from "./styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import { Field, reduxForm } from "redux-form";
import renderTextField from "../../FormHelper/TextField";
import renderImageField from "../../FormHelper/ImageField";

import validate from "./validate";

class AskModal extends Component {
  onClose = () => {
    this.props.onCloseModalEdit();
    const { reset } = this.props;
    reset();
  };

  handleSubmitForm = data => {
    this.props.onSave(data);
  };

  render() {
    const { classes, handleSubmit, openModalEdit } = this.props;
    return (
      <Modal open={openModalEdit}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>Edit Ask</span>
            <CloseIcon className={classes.icon} onClick={this.onClose} />
          </div>
          <div className={classes.content}>
            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
              <Grid container>
                <Field
                  id="content"
                  label="Content"
                  className={classes.textField}
                  fullWidth
                  multiline
                  margin="normal"
                  name="content"
                  component={renderTextField}
                />
                <Field
                  name="imageAsk"
                  label="Image"
                  accept=".png, .jpg, .gif, .jpeg, .svg"
                  component={renderImageField}
                  rootClass={classes.formControl}
                />
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
  form: "ask",
  enableReinitialize: true,
  validate
});

export default compose(
  withStyles(styles),
  withReduxForm
)(AskModal);
