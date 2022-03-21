import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';

// reducers
import login from './reducers/login';
import home from './reducers/home';
import upload from './reducers/upload';
import registration from "./reducers/registration";

// rootReducer
const rootReducer = combineReducers({
    login,
    home,
    upload,
    registration
});

// store (main storage)
const store = configureStore({
    reducer: rootReducer
});

export default store;