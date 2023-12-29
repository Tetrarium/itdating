import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import changeAuthWidgetReducer from "./reducers/changeAuthWidgetReducer";
import filterReducer from './reducers/FilterSlice';
import loginReducer from './reducers/LoginSlice'

const rootReducer = combineReducers({
    filterReducer,
    loginReducer,
})

const store = configureStore({
    reducer: rootReducer
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
};

export default setupStore;
