import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        passwordValue: ""
    },
    reducers: {
        setPasswordValue: (state, action) => {
            state.passwordValue = action.payload
        }
    }
})

export const { setPasswordValue } = loginSlice.actions;
export default loginSlice.reducer;