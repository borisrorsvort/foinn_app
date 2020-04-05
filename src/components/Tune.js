import {
  CircularProgress,
  Grid,
  Typography,
  withStyles,
  Dialog,
  Slide,
  AppBar,
  IconButton,
  Toolbar,
  Link
} from "@material-ui/core";
import React, { Component, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
import SheetMusic from "./SheetMusic";
import { TUNE_URL } from "../constants/actionTypes";
import { connect } from "react-redux";
import { fetchTune } from "../actions/tuneBook";
import he from "he";
import store from "../store";
import history from "../history";
import PageLoading from "./PageLoading";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  root: {
    marginTop: 100
  },
  settings: theme.mixins.gutters({
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing()
  }),
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
});

function Tune(props) {
  useEffect(() => {
    props.tuneId && store.dispatch(fetchTune(props.tuneId));
  }, [props.tuneId]);

  const tuneLoaded = props.currentTune?.name !== undefined;

  const handleClose = () => history.push(props.referrer);

  return (
    <Dialog
      fullScreen
      open={!!props.tuneId}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={props.classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleClose}
            aria-label="close"
            color="inherit"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={props.classes.title}>
            {tuneLoaded && he.decode(props.currentTune.name)}
          </Typography>
        </Toolbar>
      </AppBar>
      {!tuneLoaded && <PageLoading />}
      {tuneLoaded && (
        <Grid container justify="center" className={props.classes.root}>
          <Grid item xs={12} md={6}>
            {props.currentTune.settings.map((setting, i) => {
              return (
                <div key={`${setting.id}-${i}`}>
                  <Typography variant="h5" gutterBottom>
                    Setting #{setting.id} ({setting.key})
                  </Typography>
                  <Typography variant="body2">
                    by {setting.member.name} on {setting.date} —{" "}
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      href={`${TUNE_URL}${props.currentTune.id}#setting${setting.id}`}
                    >
                      View on The Session.org
                    </Link>
                  </Typography>
                  <SheetMusic tune={setting} type={props.currentTune.type} />
                </div>
              );
            })}
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
}

const mapStateToProps = (state, props) => ({
  currentTune: state.tunes.currentTune,
  isFetching: state.tunes.currentTune.isFetching,
  tuneId: props.match.params.tuneId
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Tune)));
