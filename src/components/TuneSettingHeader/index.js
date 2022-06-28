import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { YouTube } from "@material-ui/icons";
import { decode } from "he";
import React from "react";

const useStyles = makeStyles((theme) => ({
  spacer: {
    margin: theme.spacing(0, 2, 2, 0)
  }
}));

const TuneSettingHeader = ({ setting }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {setting.name ? decode(setting.name) : `Setting #${setting.id}`}
      </Typography>
      <Box mb={2}>
        <Typography variant="body2">
          by {setting.member.name} on {setting.date}
        </Typography>
      </Box>
      <Button
        className={classes.spacer}
        variant="outlined"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        href={setting.url}
      >
        View on the Session.org
      </Button>
      {setting.name && (
        <Button
          className={classes.spacer}
          variant="outlined"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          contained
          startIcon={<YouTube />}
          href={`https://www.youtube.com/results?search_query=${decode(
            setting.name
          )}`}
        >
          Search on Youtube
        </Button>
      )}
    </>
  );
};

export default TuneSettingHeader;
