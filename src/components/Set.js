import {
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
import React, { useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from "react-router-dom";
import SheetMusic from "./SheetMusic";
import { TUNE_URL } from "../constants/actionTypes";
import { connect } from "react-redux";
import { fetchSet } from "../actions/sets";
import he from "he";
import store from "../store";
import PageLoading from "./PageLoading";

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
    !!props.setId && store.dispatch(fetchSet(props.userId, props.setId));
  }, [props.setId, props.userId]);

  const setLoaded = props.currentSet?.name !== undefined;

  const handleClose = () => props.history.push(props.referrer);

  return (
    <Dialog
      fullScreen
      open={!!props.setId}
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
            {setLoaded && he.decode(props.currentSet.name)}
          </Typography>
        </Toolbar>
      </AppBar>
      {!setLoaded && <PageLoading />}
      {setLoaded && (
        <Grid container justify="center" className={props.classes.root}>
          <Grid item xs={12} md={6}>
            {props.currentSet.settings.map((setting, i) => {
              return (
                <div key={`${setting.id}-${i}`}>
                  <Typography variant="h5" gutterBottom>
                    Setting #{setting.id}
                  </Typography>
                  <Typography variant="body2">
                    by {setting.member.name} on {setting.date} —{" "}
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      href={`${TUNE_URL}${props.currentSet.id}#setting${setting.id}`}
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
      )}
    </Dialog>
  );
}

const mapStateToProps = (state, props) => ({
  currentSet: state.sets.currentSet,
  isFetching: state.sets.currentSet.isFetching,
  setId: props.match.params.setId,
  userId: state.session.currentUser.id
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Set)));
