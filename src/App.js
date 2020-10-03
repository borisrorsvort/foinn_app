import "./App.css";
import Joyride from "react-joyride";

import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Sets from "./components/Sets";

import Tunebook from "./components/Tunebook";
import { connect } from "react-redux";
import { layoutStyles } from "./styles/layout";
import { logout } from "./actions/session";

import { toggleDrawer, toggleFilters } from "./actions/ui";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";
import { steps, stepsStyles } from "./helpers/welcomeTour";
import { useCookies } from "react-cookie";
import AppBarContent from "./components/AppBarContent";

function App(props) {
  const [cookies, setCookie] = useCookies();

  const handleDrawerToggle = () => {
    props.toggleDrawer();
  };
  const handleToggleFilters = () => {
    props.toggleFilters();
  };

  useEffect(() => {
    if (!cookies.hadConfigTour) {
      setCookie("hadConfigTour", true);
    }
  }, [cookies, setCookie]);

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
        run={!cookies.hadConfigTour}
        disableScrolling={true}
        styles={stepsStyles}
      />
      <AppBar className={classes.appBar}>
        <AppBarContent
          folder={folder}
          onToggleFilters={handleToggleFilters}
          onDrawerToggle={handleDrawerToggle}
        />
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
