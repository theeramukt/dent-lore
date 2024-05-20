import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import loginReducer from './userSlice';

export default configureStore({
    reducer: {
        search: searchReducer,
        login: loginReducer
    },
});