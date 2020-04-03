import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Hidden,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import React, { Component } from "react";

import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import { withRouter } from "react-router-dom";
import PrintIcon from "@material-ui/icons/PrintOutlined";
import SheetMusic from "./SheetMusic";
import { TUNE_URL } from "../constants/actionTypes";
import { connect } from "react-redux";
import { fetchSet } from "../actions/sets";
import he from "he";
import { safeObj } from "../helpers/objectHelper";
import store from "../store";

const styles = theme => ({
  card: {
    margin: `${theme.spacing(10)}px 0`
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  settings: {},
  iconBtn: {
    marginRight: "10px"
  },
  mainTitle: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    fontWeight: 100,
    opacity: 0.7,
    [theme.breakpoints.down("sm")]: {
      fontSize: "21px"
    }
  },
  printButton: {
    textAlign: "center"
  }
});

class Set extends Component {
  componentDidMount() {
    store.dispatch(fetchSet(this.props.userId, this.props.setId));
  }

  componentWillReceiveProps(nextProps) {
    const newSetId = nextProps.setId;
    if (this.props.setId !== newSetId) {
      store.dispatch(fetchSet(this.props.userId, newSetId));
    }
  }

  render() {
    const printUrl = `https://thesession.org/members/${this.props.userId}/sets/${this.props.setId}/sheetmusic?print=true`;
    const { classes } = this.props;

    if (this.props.isFetching) {
      return (
        <Grid container spacing={24}>
          <Grid item xs={12} md={8}>
            <CircularProgress />
          </Grid>
        </Grid>
      );
    }

    if (!safeObj(this.props.currentSet).name) {
      return null;
    }

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} md={8}>
            <Typography className={this.props.classes.mainTitle} variant="h1">
              {he.decode(this.props.currentSet.name)}
            </Typography>
            <Hidden smDown>
              <p className={classes.printButton}>
                <Button href={printUrl} target="_blank" mini>
                  <PrintIcon className={classes.iconBtn} />
                  Print
                </Button>
                <Tooltip title="If your viewing another users set, you can copy it to your tuebook. Click to go the session.org where you can add it to yours.">
                  <Button href={this.props.currentSet.url} target="_blank" mini>
                    <FileCopyIcon className={classes.iconBtn} />
                    Copy
                  </Button>
                </Tooltip>
              </p>
            </Hidden>
          </Grid>
        </Grid>
        <div className={classes.settings}>
          {this.props.currentSet.settings.map(setting => {
            return (
              <Grid container spacing={24} key={setting.id}>
                <Grid item xs={12} md={8}>
                  <SheetMusic tune={setting} />
                </Grid>
                <Hidden smDown>
                  <Grid item xs={12} md={4}>
                    <Card className={classes.card} key={setting.id}>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Setting {he.decode(setting.name)} ({setting.key})
                        </Typography>
                        <Typography variant="caption">
                          by {setting.member.name} on {setting.date}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          component={"a"}
                          target="_blank"
                          href={`${TUNE_URL}${setting.id}`}
                        >
                          View on The Session.org
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Hidden>
              </Grid>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  setId: props.match.params.setId,
  currentSet: state.sets.currentSet,
  userId: state.session.currentUser.id,
  isFetching: state.sets.currentSet.isFetching
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Set)));
