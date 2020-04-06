import { SIDEBAR_WIDTH } from "../constants/layout";

export const layoutStyles = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflowX: "hidden",
    overflowY: "auto",
    position: "relative",
    display: "flex",
    height: "100vh"
  },
  appBar: {
    position: "fixed",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  title: {
    marginLeft: theme.spacing(2)
  },
  flex: {
    flex: 1,
    display: "flex",
    alignItems: "center"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    zIndex: theme.zIndex.drawer - 1,
    width: SIDEBAR_WIDTH,
    top: 0,
    right: 0,
    height: "100vh",
    position: "fixed",
    overflowY: "auto"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  logo: {
    position: "relative",
    transform: "translateY(-2px)"
  },
  greetings: {
    marginRight: theme.spacing(),
    opacity: 0.5,
    display: "inline-block"
  },
  content: {
    width: "100%",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: "calc(100% - 56px)",
    marginTop: 56
  },
  [theme.breakpoints.up("md")]: {
    content: {
      marginTop: 64
    },
    drawerPaper: {
      height: "calc(100vh - 64px)",
      top: 64
    }
  }
});
