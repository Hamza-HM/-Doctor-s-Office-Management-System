import React from "react";
import "./App.css";
// react router
import { RouterProvider } from "react-router-dom";
import router from "./routing/Routes";

// react redux
import { Provider } from "react-redux";
import { store } from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
