import React from "react";
import "./App.css";
// react router
import { RouterProvider } from "react-router-dom";
import router from "./routing/Routes";
import GlobalAuthProvider from "@src/components/global/GlobalAuthProvider";
// react redux
import { Provider } from "react-redux";
import { store } from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalAuthProvider>
        <RouterProvider router={router} />
      </GlobalAuthProvider>
    </Provider>
  );
};

export default App;
