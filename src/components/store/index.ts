import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "./header-slice";
import { bodyReducer } from "./body-slice";

export default configureStore({
    reducer: combineReducers({
        headers: headerReducer,
        body: bodyReducer
    })
    
})