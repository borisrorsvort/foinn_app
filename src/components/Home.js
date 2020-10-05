import {
  Button,
  Grid,
  Paper,
  Typography,
  withStyles,
  Link as AnchorLink
} from "@material-ui/core";

import BodyClassName from "react-body-classname";
import { Link } from "react-router-dom";
import NameAutoComplete from "./NameAutoComplete";
import React from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import logoUrl from "../images/logo.svg";

const styles = (theme) => ({
  container: {
    height: "100vh"
  },
  paper: {
    margin: "0 auto",
    padding: "20px"
  },
  button: {
    color: "white",
    marginTop: theme.spacing(2)
  },
  home: {
    background: theme.palette.primary[500]
  },
  logo: {
    maxWidth: "100%",
    margin: "0 auto 40px",
    display: "block"
  },
  title: {
    fontSize: 21,
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 1.5,
    color: "white",
    opacity: 0.8
  },
  login: {
    alignSelf: "flex-start"
  }
});

function Home(props) {
  const { classes, userName, currentUser } = props;
  return (
    <BodyClassName className={classes.home}>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="row"
        className={classes.container}
      >
        <Grid item xs={12} md={12}>
          <img src={logoUrl} alt="Foinn app" className={classes.logo} />
          <h1 className={classes.title}>
            Browse your tunes and sets from Thessession.org <br />
            <small>The ideal session companion</small>
          </h1>
        </Grid>
        <Grid item xs={12} md={4} className={classes.login}>
          <Paper className={classes.paper} elevation={8}>
            <Typography variant="subtitle1" gutterBottom>
              To start, select your{" "}
              <AnchorLink
                href="https://thesession.org"
                color="primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                TheSession.org
              </AnchorLink>{" "}
              user name.
            </Typography>
            <NameAutoComplete userName={userName} />
            {userName && (
              <Button
                to={`/tunebook/${currentUser.id}/tunes`}
                className={classes.button}
                component={Link}
                variant="contained"
                color="primary"
              >
                Open tunebook
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </BodyClassName>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  userName: !isEmpty(state.session.currentUser)
    ? state.session.currentUser.name
    : ""
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
