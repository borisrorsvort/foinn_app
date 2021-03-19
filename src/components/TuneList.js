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
  Divider,
  capitalize
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { LibraryMusic } from "@material-ui/icons";

const useStyles = makeStyles({});

function TuneList(props) {
  const classes = useStyles();
  const {
    items,
    match: {
      url,
      params: { folder }
    }
  } = props;
  const isTune = folder === "tunes";
  const itemName = (item) =>
    item &&
    (item.name.length > 150
      ? he.decode(item.name).substring(0, 150) + "..."
      : he.decode(item.name));
  return (
    <List className={classes.root} id="tunesList">
      {items.map((item, index) => (
        <li key={`${index}-item.id`}>
          <ListItem component={Link} button to={`${url}/${item.id}`}>
            <ListItemIcon>
              {isTune ? <MusicNote /> : <LibraryMusic />}
            </ListItemIcon>
            <ListItemText
              primary={itemName(item)}
              secondary={
                item.type ||
                item.settings.map((set) => capitalize(set.type)).join(", ")
              }
            />
          </ListItem>
          <Divider variant="inset" />
        </li>
      ))}
    </List>
  );
}

export default withRouter(TuneList);
