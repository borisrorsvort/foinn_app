import {
  Grid,
  Typography,
  withStyles,
  Dialog,
  Slide,
  AppBar,
  IconButton,
  Toolbar,
  Link,
  Box
} from "@material-ui/core";
import React, { useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
import SheetMusic from "./SheetMusic";
import { connect } from "react-redux";
import { fetchTune } from "../actions/tuneBook";
import he from "he";
import store from "../store";
import PageLoading from "./PageLoading";
import TuneDialogNav from "./TuneDialogNav";
import TuneSettingHeader from "./TuneSettingHeader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  root: {
    marginTop: 100,
    padding: theme.spacing(0, 3)
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

  const handleClose = () => props.history.push(props.referrer);

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
          <TuneDialogNav tuneId={props.currentTune.id} folder="tunes" />
        </Toolbar>
      </AppBar>
      {!tuneLoaded && <PageLoading />}
      {tuneLoaded && (
        <Box p={2}>
          <Grid container justify="center" className={props.classes.root}>
            <Grid item md={12} md={10} lg={9}>
              {props.currentTune.settings.map((setting, i) => {
                return (
                  <div key={`${setting.id}-${i}`}>
                    <TuneSettingHeader setting={setting} />
                    <SheetMusic tune={setting} type={props.currentTune.type} />
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </Box>
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
