import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import smallLogoUrl from "../../images/logo-small.svg";
import { Hidden, Typography, withStyles } from "@material-ui/core";
import Filters from "@material-ui/icons/Search";
import startCase from "lodash/startCase";
import { layoutStyles } from "../../styles/layout";

function AppBarContent(props) {
  const { classes, folder, onToggleFilters, onDrawerToggle } = props;
  return (
    <Toolbar>
      <IconButton
        id="navToggle"
        color="inherit"
        aria-label="open drawer"
        onClick={onDrawerToggle}
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
          onClick={onToggleFilters}
          className={classes.navIconHide}
        >
          <Filters />
        </IconButton>
      </Hidden>
    </Toolbar>
  );
}

export default withStyles(layoutStyles)(AppBarContent);
