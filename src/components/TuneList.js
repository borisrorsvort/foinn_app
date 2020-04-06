import React, { Fragment } from "react";
import MusicNote from "@material-ui/icons/MusicNote";
import { withRouter } from "react-router-dom";
import he from "he";
import {
  ListItem,
  ListItemIcon,
  makeStyles,
  List,
  ListItemText,
  Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({});

function TuneList(props) {
  const classes = useStyles();
  const { items, match } = props;
  const itemName = (item) =>
    item &&
    (item.name.length > 40
      ? he.decode(item.name).substring(0, 40) + "..."
      : he.decode(item.name));

  return (
    <List className={classes.root} id="tunesList">
      {items.map((item, index) => (
        <Fragment key={`${index}-item.id`}>
          <ListItem
            component={Link}
            button
            to={match.params.tuneId ? `${item.id}` : `${match.url}/${item.id}`}
          >
            <ListItemIcon>
              <MusicNote />
            </ListItemIcon>
            <ListItemText primary={itemName(item)} secondary={item.type} />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Fragment>
      ))}
    </List>
  );
}

export default withRouter(TuneList);
