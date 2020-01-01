import React from "react";
import classNames from "classnames";
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import NavbarLinks from "./NavbarLinks.js";
import style from "./styles";

function Header({ ...props }) {
  function makeBrand() {
    var name;
    props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = prop.name;
      }
      return null;
    });
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  let name = localStorage.getItem("name");
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <span className={classes.title}>
            {makeBrand()}
          </span>
        </div>
        <span className={classes.name}>{name}</span>
        <Hidden smDown implementation="css">
          {<NavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(style)(Header);
