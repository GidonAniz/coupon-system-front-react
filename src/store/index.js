import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import uiReducer from './ui-slice'
import userDetailsReducer from './userDetails'


const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        user: userDetailsReducer,
        

    }
})

export default store