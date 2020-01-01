import React from "react";
import {
  withStyles,
  FormControl,
  FormLabel,
  Button,
  FormHelperText
} from "@material-ui/core";

const renderImageField = withStyles(() => ({
  input: {
    display: "none"
  }
}))(
  ({
    input: { value, name, onChange },
    label,
    meta: { touched, error },
    classes,
    onFieldChange,
    buttonLabel,
    accept = "*",
    required = false,
    rootClass = ""
  }) => (
    <FormControl
      classes={{ root: rootClass }}
      required={required}
      component="fieldset"
      error={!!(touched && error)}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <input
        accept={accept}
        className={classes.input}
        id={name}
        type="file"
        onChange={e => {
          e.preventDefault();
          onChange(e.target.files[0]);
          onFieldChange && onFieldChange(e.target.files[0]);
        }}
        onBlur={() => {}}
      />
      <label htmlFor={name}>
        <Button
          classes={{ root: classes.button }}
          variant="outlined"
          component="span"
        >
          {buttonLabel || "Image"}
        </Button>
      </label>
      <label>{value && value.name}</label>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
);

export default renderImageField;
