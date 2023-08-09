import axios from "axios";
import { ALL_USERS_REQUEST,
   ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
     CLEAR_ERROR } from "../reducers/adminReducer";


import {USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from "../reducers/userDetailReducer";


export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch(ALL_USERS_REQUEST());
      const { data } = await axios.get("/api/admin/users");
  
      if(data.success){
        dispatch( ALL_USERS_SUCCESS(data.users));
      }
      else{
        throw new Error("Some error in backend");
      }
    } catch (error) {
      dispatch(ALL_USERS_FAIL(error.message));
    }
  };

  
  // get  User Details
  export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch(USER_DETAILS_REQUEST());
      const { data } = await axios.get(`/api/admin/user/${id}`);
  
      dispatch(USER_DETAILS_SUCCESS(data.user));
    } catch (error) {
      dispatch(USER_DETAILS_FAIL(error.response.data.message));
    }
  };
  
  // Update User
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch(UPDATE_USER_REQUEST());
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/api/admin/user/${id}`,
        userData,
        config
      );
  
      dispatch(UPDATE_USER_SUCCESS(data.success));
    } catch (error) {
      dispatch(UPDATE_USER_FAIL(error.response.data.message));
    }
  };
  
  // Delete User
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch(DELETE_USER_REQUEST());
  
      const { data } = await axios.delete(`/api/admin/user/${id}`);
  
      if(data.success){
        dispatch(DELETE_USER_SUCCESS(data));
      }
    } catch (error) {
      dispatch(DELETE_USER_FAIL(error.response.data.message));
    }
  };
  
  
      //clearing errors
  export const clearErrors = () => async (dispatch) => {
      dispatch(CLEAR_ERROR())
  }