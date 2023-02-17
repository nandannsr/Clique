import { createSlice } from '@reduxjs/toolkit';
import instance from '../utils/axiosInstance';
import jwt_decode from 'jwt-decode';

let initialState = {
    user: "",
    token: "",
    loading: false,
    isAuthenticated: false,
    error: null,
}

const authSlice = createSlice({
    name: "user",
    initialState: () => ({...initialState}),
    reducers: {
        login: (state, action) => {
            state.token = action.payload.access;
            state.user = action.payload.user;
            state.loading = action.payload.loading;
            state.isAuthenticated = action.payload.isAuthenticated;
            try {
                localStorage.setItem("access_token", action.payload.access);
                localStorage.setItem("refresh_token", action.payload.refresh);
                localStorage.setItem("email", action.payload.user);
                localStorage.setItem("isAuthenticated", action.payload.isAuthenticated);
            } catch (error) {
                console.error(error);
            }
        },
        setError: (state, action) => {
            state.error = action.payload.message
        },


    }
});



export const { login,setError } = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
    dispatch(login({ loading: true }));
    try {
      const res = await instance.post('api/login/', {
        email: email,
        password: password,
      });
      const access = res.data.access;
      dispatch(
        login({
          access,
          refresh: res.data.refresh,
          user: jwt_decode(access).email,
          loading: false,
          isAuthenticated: true,
        })
      );
      return access;
    } catch (err) {
      console.error(err);
      console.log(err.response.data);
      if (err.response.status === 401) {
        dispatch(setError({ message: 'invalid credentials' }));
      }
      dispatch(login({ loading: false }));
      return null;
    }
  };




export default authSlice.reducer;