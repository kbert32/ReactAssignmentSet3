// import {createStore} from 'redux';       //without redux toolkit
import {configureStore} from '@reduxjs/toolkit';
import counterSliceReducer from './counter';
import authSliceReducer from './auth';


const store = configureStore({              //merging our slices into our store
    reducer: {
        counter: counterSliceReducer,
        auth: authSliceReducer
    },
});

export default store;

