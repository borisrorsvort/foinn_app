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
  Box,
  Hidden
} from "@material-ui/core";
import React, { useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
import SheetMusic from "./SheetMusic";
import { connect } from "react-redux";
import { fetchSet } from "../actions/sets";
import he, { decode } from "he";
import store from "../store";
import PageLoading from "./PageLoading";
import TuneDialogNav from "./TuneDialogNav";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
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

function Set(props) {
  useEffect(() => {
    !!props.tuneId && store.dispatch(fetchSet(props.userId, props.tuneId));
  }, [props.tuneId, props.userId]);

  const setLoaded = props.currentSet?.name !== undefined;

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
          <Hidden xsDown>
            <Typography variant="h6" className={props.classes.title}>
              {setLoaded && he.decode(props.currentSet.name)}
            </Typography>
          </Hidden>
          <TuneDialogNav tuneId={props.currentSet.id} folder="sets" />
        </Toolbar>
      </AppBar>
      {!setLoaded && <PageLoading />}
      {setLoaded && (
        <Box p={2}>
          <Grid container justify="center" className={props.classes.root}>
            <Grid item md={12} md={10} lg={9}>
              {props.currentSet.settings.map((setting, i) => {
                return (
                  <div key={`${setting.id}-${i}`}>
                    <Typography variant="h5" gutterBottom>
                      {decode(setting.name)}
                    </Typography>
                    <Typography variant="body2">
                      by {setting.member.name} on {setting.date} —{" "}
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        href={setting.url}
                      >
                        View on The Session.org
                      </Link>
                    </Typography>
                    <SheetMusic tune={setting} type={props.currentSet.type} />
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
  currentSet: state.sets.currentSet,
  isFetching: state.sets.currentSet.isFetching,
  tuneId: props.match.params.tuneId,
  userId: state.session.currentUser.id
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Set)));
