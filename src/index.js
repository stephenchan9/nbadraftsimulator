import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./pages/homepage.js";
import theme from "./theme.json";
import { ThemeProvider } from "emotion-theming";

// React redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import draftBoard from "./reducers/draftboardreducer.js";

const store = createStore(draftBoard);

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Homepage heading="Welcome User" draftBoard ={[]}/>
      </ThemeProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
