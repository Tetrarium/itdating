import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogIn: false
};

export const loginSlice = createSlice({
    name: 'checkLogin',
    initialState,
    reducers: {
        logIn(state) {
            state.isLogIn = true;
        },
        logOut(state) {
            state.isLogIn = false;
        },
    },
});

export const {logIn, logOut} = loginSlice.actions;

export default loginSlice.reducer;