import "./index.css";
import { Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import App from "./App";
import Home from "./components/Home";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import history from "./history";

const white = {
  50: "#fff",
  100: "#fff",
  200: "#fff",
  300: "#fff",
  400: "#fff",
  500: "#fff",
  600: "#fff",
  700: "#fff",
  800: "#fff",
  900: "#fff",
  A100: "#fff",
  A200: "#fff",
  A400: "#fff",
  A700: "#fff",
  contrastDefaultColor: "brown"
};

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      ...white
    },
    error: red
  },
  typography: {
    useNextVariants: true,
    h1: {
      fontFamily: "'Kaushan Script', 'cursive'",
      fontSize: "2.8125rem"
    }
  }
});

const app = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/tunebook/:userId/:folder">
            <App />
          </Route>
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
