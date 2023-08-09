import { createSlice }  from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    isAuthenticated: false,
    user: {},
    message: "",
    error: "",
}

const signUpReducer = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        SIGN_REQUEST: (state) => {
            state.loading = true;
        },
        SIGN_UP_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = action.payload.success;
            state.user = action.payload;
            state.message = "User created successfully";
        },
        LOGOUT: (state, action) => {
            state.isAuthenticated = false;
            state.user = {};
            state.message = action.payload;
            state.error = "";
            state.loading = false;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.loading = false;
            state.isAuthenticated = action.payload.success;
            state.user = action.payload;
            state.message = "User Logged in Successfully";
        },
        LOAD_USER_SUCCESS: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        SIGN_FAIL: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
            state.message = "";
        },
        CLEAR_SIGN_MSGS_ERR: (state) => {
            state.loading = false;
            state.error = "";
            state.message = "";
        },
    
}})

export default signUpReducer.reducer;
export const { SIGN_REQUEST, SIGN_UP_SUCCESS, SIGN_FAIL, LOGIN_SUCCESS, CLEAR_SIGN_MSGS_ERR, LOAD_USER_SUCCESS, LOGOUT } = signUpReducer.actions;

