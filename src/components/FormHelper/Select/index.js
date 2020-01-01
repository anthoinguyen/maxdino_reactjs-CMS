import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return null;
  }
  return <FormHelperText>{touched && error}</FormHelperText>;
};

const renderSelectField = ({
  classes,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl className={classes.formControl} error={touched && error}>
    <InputLabel htmlFor="age-required">{label}</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: "age",
        id: "age-required"
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

export default withStyles(styles)(renderSelectField);
