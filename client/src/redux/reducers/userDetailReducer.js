import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: {},
    error: null,
}
export const userDetailsReducer = createSlice({
    name: "User Detail",
    initialState,
    reducers:
        {
           USER_DETAILS_REQUEST: (state, action) =>
               {
                state.loading= true;
              },
            USER_DETAILS_SUCCESS: (state, action) =>{
                state.loading= false;
                state.user= action.payload;
              },
        
            USER_DETAILS_FAIL: (state, action) =>{
                state.loading= false;
                state.error= action.payload;
              },
        
            CLEAR_ERROR: (state, action) =>{
                state.error= null;
              },
        }
})

export const {USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, CLEAR_ERROR} = userDetailsReducer.actions;
export default userDetailsReducer.reducer;