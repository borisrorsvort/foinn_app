import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Home from "@material-ui/icons/Home";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryMusic from "@material-ui/icons/LibraryMusic";
import MusicNote from "@material-ui/icons/MusicNote";
import { connect } from "react-redux";
import history from "../../history";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

function NavDrawer(props) {
  const classes = useStyles();

  const items = [
    {
      label: `Home`,
      to: `/`,
      icon: <Home />
    },
    {
      label: `Sets ${!!props.setsCount ? "(" + props.setsCount + ")" : ""}`,
      to: `/tunebook/${props.currentUser.id}/sets`,
      icon: <LibraryMusic />
    },
    {
      label: `Tunes ${!!props.tunesCount ? "(" + props.tunesCount + ")" : ""}`,
      to: `/tunebook/${props.currentUser.id}/tunes`,
      icon: <MusicNote />
    }
  ];

  const handleClick = item => {
    props.onClose();
    history.push(item.to);
  };

  const list = () => (
    <div role="presentation" className={classes.list}>
      <List>
        {items.map(item => (
          <ListItem button key={item.label} onClick={() => handleClick(item)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer anchor={"left"} open={props.open} onClose={props.onClose}>
      {list()}
    </Drawer>
  );
}

const mapStateToProps = state => ({
  tunesCount: state.tunes.meta?.total,
  setsCount: state.sets.meta?.total,
  currentUser: state.session.currentUser
});

export default connect(mapStateToProps)(NavDrawer);
