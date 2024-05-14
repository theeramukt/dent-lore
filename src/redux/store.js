import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './userSlice';

export default configureStore({
    reducer: {
        search: searchReducer
    },
});