import {
  CircularProgress,
  Grid,
  Typography,
  withStyles,
  Dialog,
  Slide,
  AppBar,
  IconButton,
  Toolbar
} from "@material-ui/core";
import React, { Component, Fragment } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
import SheetMusic from "./SheetMusic";
import { TUNE_URL } from "../constants/actionTypes";
import { connect } from "react-redux";
import { fetchTune } from "../actions/tuneBook";
import he from "he";
import store from "../store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  root: {
    marginTop: 100
  },
  settings: theme.mixins.gutters({
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }),
  title: {
    marginLeft: theme.spacing.unit * 2,
    flex: 1
  }
});

class Tune extends Component {
  componentDidMount() {
    store.dispatch(fetchTune(this.props.tuneId));
  }

  componentWillReceiveProps(nextProps) {
    const newTuneId = nextProps.tuneId;
    if (this.props.tuneId !== newTuneId) {
      store.dispatch(fetchTune(newTuneId));
    }
  }

  render() {
    if (this.props.isFetching) {
      return (
        <Grid container spacing={24}>
          <Grid item xs={12} md={8}>
            <CircularProgress />
          </Grid>
        </Grid>
      );
    }

    if (
      this.props.currentTune === undefined ||
      this.props.currentTune.name === undefined
    ) {
      return null;
    }

    return (
      <Dialog
        fullScreen
        open={!!this.props.tuneId}
        onClose={() => {}}
        TransitionComponent={Transition}
      >
        <AppBar className={this.props.classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="secondary"
              onClick={() => {}}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={this.props.classes.title}
              color="secondary"
            >
              {he.decode(this.props.currentTune.name)}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={24}
          justify="center"
          className={this.props.classes.root}
        >
          <Grid item xs={12} md={6}>
            {this.props.currentTune.settings.map(setting => {
              return (
                <div>
                  <Typography variant="h5" gutterBottom>
                    Setting #{setting.id} ({setting.key})
                  </Typography>
                  <Typography variant="body2">
                    by {setting.member.name} on {setting.date} —{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${TUNE_URL}${this.props.currentTune.id}#setting${setting.id}`}
                    >
                      View on The Session.org
                    </a>
                  </Typography>
                  <SheetMusic
                    tune={setting}
                    type={this.props.currentTune.type}
                  />
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

const mapStateToProps = (state, props) => ({
  currentTune: state.tunes.currentTune,
  isFetching: state.tunes.currentTune.isFetching,
  tuneId: props.match.params.tuneId
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Tune)));
