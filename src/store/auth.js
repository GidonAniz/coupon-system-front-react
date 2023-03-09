import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { isAuthenticated: false, token: localStorage.getItem('token'), customerType: localStorage.getItem('localStorage')},
    reducers: {
        login(state, action) {
            console.log(action.payload)
            state.isAuthenticated = true;
            const token = action.payload[0];
            localStorage.setItem('token', token)
            state.token = token
            const customerType = action.payload[1];
            localStorage.setItem('customerType', customerType)
            state.customerType = customerType
            console.log("from the slice token = " + token + " customerType= " + customerType)

        },
        logout(state) {
            state.isAuthenticated = false
        },
    }
})
export const authActions = authSlice.actions

export default authSlice.reducer