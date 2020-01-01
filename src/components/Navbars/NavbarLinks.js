import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import {
  withStyles,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden,
  Popper,
  Divider,
  Avatar
} from "@material-ui/core";
import Button from "../../components/CustomButtons/Button.jsx";
import HeaderLinksStyle from "./HeaderLinksStyle";
import * as CommonAction from "./../../actions";
import * as LoginAction from "./../../containers/Login/action";
import avatar from "./../../assets/img/avatar.png";
import * as host from "./../../constants/config";

class NavbarLinks extends React.Component {
  state = {
    openProfile: false
  };
  handleToggleProfile = () => {
    this.setState(state => ({ openProfile: !state.openProfile }));
  };
  handleCloseProfile = event => {
    this.setState({ openProfile: false });
  };

  onChangePassword = () => {
    this.handleCloseProfile();
    this.props.commonActionCreators.pushChangePassword();
  };

  onLogout = () => {
    this.handleCloseProfile();
    this.props.loginActionCreators.logout();
  };

  render() {
    const { classes } = this.props;
    const { openProfile } = this.state;
    let linkAvatar = localStorage.getItem("avatar");
    let link = null;
    if (linkAvatar) {
      link = `${host.IMAGE_LINK}${linkAvatar}`;
    }
    return (
      <div className={classes.manager}>
        <Button
          buttonRef={node => {
            this.anchorProfile = node;
          }}
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={null}
          aria-haspopup="true"
          onClick={this.handleToggleProfile}
          className={classes.buttonLink}
        >
          <Avatar
            alt="Remy Sharp"
            src={ avatar}
            className={classes.bigAvatar}
          />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Popper
          open={openProfile}
          anchorEl={this.anchorProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center top"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.onChangePassword}
                      className={classes.dropdownItem}
                    >
                      Change Password
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={this.onLogout}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    loginActionCreators: bindActionCreators(LoginAction, dispatch),
    commonActionCreators: bindActionCreators(CommonAction, dispatch)
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withStyles(HeaderLinksStyle),
  withConnect
)(NavbarLinks);
