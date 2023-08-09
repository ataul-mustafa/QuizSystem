import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: {},
  error: "",
  isUpdated: false,
  isDeleted: false,
  message: ""
};

export const adminReducer = createSlice({
  name: "All users list",
  initialState,
  reducers: { // Use "reducers" instead of "reducer"
    ALL_USERS_REQUEST: (state, action) => {
      state.loading = true;
    },

    ALL_USERS_SUCCESS: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },

    ALL_USERS_FAIL: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.users = {};
    },

    UPDATE_USER_REQUEST: (state, action) => {
      state.loading = true;
    },

    UPDATE_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
    },

    UPDATE_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },

    UPDATE_USER_RESET: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },

    DELETE_USER_REQUEST: (state, action) => {
      state.loading = true;
    },

    DELETE_USER_SUCCESS: (state, action) => {
      state.loading= false;
      state.isDeleted= action.payload.success;
      state.message= action.payload.message;
    },

    DELETE_USER_RESET: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.message= "";
    },

    DELETE_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = "";
      state.loading = false;
      state.users = {};
      state.isUpdated= false;
      state.isDeleted= false;
      state.message= "";
    },

    // You don't need a default case with createSlice
  },
});

export default adminReducer.reducer;
export const {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  CLEAR_ERROR,
} = adminReducer.actions;
