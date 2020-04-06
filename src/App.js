import "./App.css";
import Joyride from "react-joyride";

import { Hidden, Typography } from "@material-ui/core";
import Filters from "@material-ui/icons/Search";
import startCase from "lodash/startCase";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Sets from "./components/Sets";
import Toolbar from "@material-ui/core/Toolbar";
import Tunebook from "./components/Tunebook";
import { connect } from "react-redux";
import { layoutStyles } from "./styles/layout";
import { logout } from "./actions/session";
import smallLogoUrl from "./images/logo-small.svg";
import { toggleDrawer, toggleFilters } from "./actions/ui";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";
import { steps } from "./helpers/welcomeTour";

function App(props) {
  const handleDrawerToggle = () => {
    props.toggleDrawer();
  };
  const handleToggleFilters = () => {
    props.toggleFilters();
  };

  const {
    classes,
    showDrawer,
    match: {
      params: { folder, userId }
    }
  } = props;
  return (
    <div className={classes.root}>
      <Joyride
        steps={steps}
        continuous={true}
        showProgress={true}
        disableScrolling={true}
      />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            id="navToggle"
            color="inherit"
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
            <Typography className={classes.title} variant="h6">
              — {startCase(folder)}
            </Typography>
          </div>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggleFilters}
              className={classes.navIconHide}
            >
              <Filters />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <NavDrawer onClose={handleDrawerToggle} open={showDrawer} />
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

const mapStateToProps = (state) => ({
  showDrawer: state.ui.showDrawer
});

export default withRouter(
  connect(mapStateToProps, { logout, toggleFilters, toggleDrawer })(
    withStyles(layoutStyles)(App)
  )
);
