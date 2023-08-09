import { createSlice }  from '@reduxjs/toolkit'

const initialState = {
    uniqueId: null,
    error: "",
    message: "",
}


const uniqueIdReducer = createSlice({
    name: 'UniqueId',
    initialState,
    reducers: {
        SAVE_UNIQUE_ID: (state, action) => {
           state.uniqueId = action.payload;
        },

        SAVE_UNIQUE_ID_FAIL: (state, action) => {
            state.message = action.payload;
        },

        SAVE_UNIQUE_ID_ERROR: (state, action) => {
            state.error = action.payload;
        },

        CLEAR_SAVE_UNIQUE_ID_ERROR: (state) => {
            state.error = "";
            state.message = "";
        }
    
}})

export default uniqueIdReducer.reducer;
export const { SAVE_UNIQUE_ID, SAVE_UNIQUE_ID_FAIL, SAVE_UNIQUE_ID_ERROR, CLEAR_SAVE_UNIQUE_ID_ERROR } = uniqueIdReducer.actions;