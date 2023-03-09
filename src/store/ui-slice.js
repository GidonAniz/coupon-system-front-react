import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { notification: null },
    reducers: {
        notify(state, action) {
            state.notification = action.payload
        }
        
    }
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer