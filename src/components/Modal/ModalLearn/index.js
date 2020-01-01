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
import renderImageField from "../../FormHelper/ImageField";

import validate from "./validate";

class LearnModal extends Component {
  onClose = () => {
    this.props.onCloseModalAdd();
    const { reset } = this.props;
    reset();
  };

  handleSubmitForm = data => {
    this.props.onSave(data);
  };

  render() {
    const { classes, handleSubmit, openModalAdd, titleModal } = this.props;

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
                  id="title"
                  label="Title"
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                  multiline
                  name="title"
                  component={renderTextField}
                />
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
                  name="priority"
                  id="priority"
                  component={renderSelectField}
                  fullWidth
                  label="Priority"
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Field>
                <Field
                  name="imageLearn"
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
  form: "learn",
  enableReinitialize: true,
  validate
});

export default compose(
  withStyles(styles),
  withReduxForm
)(LearnModal);
