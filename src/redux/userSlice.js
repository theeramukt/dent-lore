import { createSlice } from '@reduxjs/toolkit';

// export const searchSlice = createSlice({
//     name: "search",
//     initialState: {
//         searchValue: ""
//     },
//     reducers: {
//         setSearchValue: (state, action) => {
//             state.searchValue = action.payload
//         }
//     }
// })

// export const { setSearchValue } = searchSlice.actions;
// export default searchSlice.reducer;

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