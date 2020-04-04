import "./App.css";

import { Button, Hidden } from "@material-ui/core";
import Help from "@material-ui/icons/Help";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavDropDown from "./components/NavDropDown";
import Sets from "./components/Sets";
import Toolbar from "@material-ui/core/Toolbar";
import Tunebook from "./components/Tunebook";
import { connect } from "react-redux";
import { layoutStyles } from "./styles/layout";
import { logout } from "./actions/session";
import smallLogoUrl from "./images/logo-small.svg";
import store from "./store";
import { toggleDrawer } from "./actions/ui";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";

function App(props) {
  const handleDrawerToggle = () => {
    store.dispatch(toggleDrawer());
  };

  const {
    classes,
    match: {
      params: { folder, userId }
    }
  } = props;

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.flex}>
            <Hidden smDown>
              <img src={smallLogoUrl} alt="Foinn" className={classes.logo} />
            </Hidden>
            <NavDropDown />
          </div>
          <Button component={Link} to={"/"} color="secondary">
            Change user
          </Button>
          <IconButton
            size="small"
            component="a"
            color="secondary"
            href="mailto:accounts+foinn@rorsvort.com"
          >
            <Help />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        {folder === "tunes" ? (
          <Tunebook userId={userId} />
        ) : (
          <Sets userId={userId} />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  showDrawer: state.ui.showDrawer
});

export default withRouter(
  connect(mapStateToProps, { logout })(withStyles(layoutStyles)(App))
);
