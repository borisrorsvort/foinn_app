import { Drawer, Hidden, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { layoutStyles } from "../styles/layout";

class FiltersDrawer extends Component {
  handleDrawerToggle() {
    // store.dispatch(toggleDrawer());
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.drawerPaper}
        ref={element => (this.divRef = element)}
      >
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={true}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleFilterDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="persistent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({});

export default withRouter(
  connect(mapStateToProps)(withStyles(layoutStyles)(FiltersDrawer))
);
