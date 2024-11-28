import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import { SocketProvider } from "./context/socketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketProvider>
  </React.StrictMode>
);
