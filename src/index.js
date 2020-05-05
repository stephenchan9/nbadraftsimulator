import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./components/homepage.js";
import { ThemeProvider } from "emotion-theming";
// import theme from "@rebass/preset";

// React redux
import { Provider } from "react-redux";
import { createStore } from 'redux'
import draftBoard from "./reducers/draftboardreducer.js"

const store = createStore(draftBoard);

const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64],
  colors: {
    primary: "#07c",
    gray: "#f6f6ff",
  },
  buttons: {
    primary: {
      color: "white",
      bg: "primary",
    },
    outline: {
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 0 2px",
    },
  },
};

const config = {
  name: "Stephen",
  key:
    "dj0yJmk9SHRVY2QySVJWbDdUJmQ9WVdrOWFsQnRZbTE1TlRZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTRi",
  secret: "b685b69d028b2224408131b26104548c4cb95ce4",
};

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Homepage config={config} />
      </ThemeProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
