import "./index.css";
import { Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#357a38",
      ...green
    },
    secondary: green,
    error: red
  },
  typography: {
    h1: {
      fontFamily: "'Kaushan Script', 'cursive'",
      fontSize: "2.8125rem"
    }
  }
});

const app = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <SnackbarProvider>
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
      </SnackbarProvider>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
