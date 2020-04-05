import { Drawer, Hidden, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { layoutStyles } from "../styles/layout";
import { toggleFilters } from "../actions/ui";

class FiltersDrawer extends Component {
  handleFiltersToggle = () => {
    this.props.toggleFilters();
  };

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
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleFiltersToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            Hello
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="right"
            variant="persistent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            Hello
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.ui.showFilters
});

export default withRouter(
  connect(mapStateToProps, { toggleFilters })(
    withStyles(layoutStyles)(FiltersDrawer)
  )
);
