import { Box, Button } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import findIndex from "lodash/findIndex";
import { Link, withRouter } from "react-router-dom";

function TuneDialogNav(props) {
  const {
    tuneId,
    folder,
    match: { path }
  } = props;
  const items = useSelector((state) => state[folder][folder]);
  const currentIndex = findIndex(items, { id: tuneId });
  const previousId = items[currentIndex - 1]?.id;
  const nextId = items[currentIndex + 1]?.id;

  return (
    <Box style={{ marginLeft: "auto" }}>
      {previousId && (
        <Button
          color="inherit"
          component={Link}
          to={path.replace(":tuneId?", previousId)}
        >
          Previous
        </Button>
      )}
      {nextId && (
        <Button
          color="inherit"
          component={Link}
          to={path.replace(":tuneId?", nextId)}
        >
          Next
        </Button>
      )}
    </Box>
  );
}

export default withRouter(TuneDialogNav);
