import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './components/App';
import VerifyEmailAddress from "./components/VerifyEmailAddress/VerifyEmailAddress";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter basename="/">
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/email/verify/:id/hash' element={<VerifyEmailAddress />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
