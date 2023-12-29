import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './components/App';
import VerifyEmailAddress from "./components/VerifyEmailAddress/VerifyEmailAddress";

import { Provider } from "react-redux";
import setupStore from "./store";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
            <BrowserRouter basename="/">
                <App />
            </BrowserRouter>
    </Provider>
);
