import { createSlice } from "@reduxjs/toolkit";

const userDetails = createSlice({
    name: 'user',
    initialState: { firstName: "",lastName: "",companyName: "" },
    reducers: {
        fName(state, action) {
            state.firstName = action.payload;
        },
        lName(state,action) {
            state.lastName = action.payload;
        },
        cName(state,action) {
            state.companyName = action.payload;
        },
    }
})

export const userAction = userDetails.actions
export default userDetails.reducer