import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Main from "./Main/Main";
import Home from "./Home/Home.jsx";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import VerifyEmailAddress from "./VerifyEmailAddress/VerifyEmailAddress.jsx";
import PasswordReset from "./PasswordReset/PasswordReset.jsx";

import { logIn, logOut } from "../store/reducers/LoginSlice.js";

import './App.scss';
import { fetchLoginState } from "../fetchingAPI/authentication.js";

function App() {
    const { isLogIn } = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const setLoginState = async () => {
        const state = await fetchLoginState();
        if (state) {
            dispatch(logIn());
            navigate('/homepage/users')
        } else {
            dispatch(logOut());
            navigate('/login');
        }
    }

    useEffect( () => {
        // fetchLoginState();
        // console.log(isLogIn);
        setLoginState();
    }, [isLogIn]);

    return (
        <>
            <Header />
            <Routes>
                <Route path='/login' element={<Main />} />
                <Route path='/homepage/*' element={<Home />} />
                <Route path='/email/verify/:id/hash' element={<VerifyEmailAddress />} />
                <Route path='/reset-password/:token' element={<PasswordReset />} />

                {/* <Route
                    path='/'
                    element={<Navigate to={isLogIn ? '/login' : '/homepage/users'} />}
                /> */}

                <Route path='*' element={<div>Страницы не существует</div>} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
