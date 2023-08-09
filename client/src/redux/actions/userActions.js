import axios from "axios";
import { SIGN_REQUEST, SIGN_UP_SUCCESS, LOGIN_SUCCESS, SIGN_FAIL,LOGOUT, LOAD_USER_SUCCESS } from "../reducers/userReducers";

export const signUp = (signUpInfo) => async (dispatch) => {
  try {
    dispatch(SIGN_REQUEST());
    const { data } = await axios.post("/api/signup", signUpInfo);

    if (data.success) {
      dispatch(SIGN_UP_SUCCESS(data));
    } else {
      dispatch(SIGN_FAIL(data.message));
    }

  } catch (error) {
    dispatch(SIGN_FAIL(error.response.data.message));
  }
};

export const login = (info) => async (dispatch) => {
  try {
    dispatch(SIGN_REQUEST());
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/login", info, config);

    if (data.success) {
      dispatch(LOGIN_SUCCESS(data));
    } else {
      dispatch(SIGN_FAIL(data.message));
    }

  } catch (error) {
    dispatch(SIGN_FAIL(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/me");

    if (data.success) {
      dispatch(LOAD_USER_SUCCESS(data));
    } else if (!data.success) {
      dispatch(SIGN_FAIL(""));
    }

  } catch (error) {
    dispatch(SIGN_FAIL(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/logout");

    if(data.success){
      dispatch(LOGOUT(data.message))
    }

  } catch (error) {
    dispatch(SIGN_FAIL(error.response.data.message));
  }
};
