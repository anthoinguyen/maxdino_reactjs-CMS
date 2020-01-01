import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import cardIconStyle from "../../assets/jss/material-dashboard-react/components/cardIconStyle.jsx";

function CardIcon({ ...props }) {
  const { classes, className, children, color, ...rest } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

export default withStyles(cardIconStyle)(CardIcon);
