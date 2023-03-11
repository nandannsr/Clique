import { createSlice } from '@reduxjs/toolkit';
import instance from '../utils/axiosInstance';
import jwt_decode from 'jwt-decode';


const authSlice = createSlice({
    name: "user",
    initialState: [],
    reducers: {
        login: (state, action) => {
            const user={
               id:action.payload.id,
               username:action.payload.username,
               firstname:action.payload.first_name,
               lastname:action.payload.last_name,
               email:action.payload.email,
               phonenumber:action.payload.phone_number,
               isLoggedIn: true,
            
              }
              const token = {
                access:action.payload.access,
                refresh:action.payload.refresh
              }
              console.log(user)
            try {
                localStorage.setItem("access_token", action.payload.access);
                localStorage.setItem("refresh_token", action.payload.refresh);
                localStorage.setItem("email", action.payload.email)
                return {
                  ...state,user,token,
                }
            } catch (error) {
                console.error(error);
            }
        },
        setError: (state, action) => {
            state.error = action.payload.message
        },

        setUserDetails: (state, action) => {
          state.user = {
                ...state.user,
                firstname: action.payload.first_name,
                lastname: action.payload.last_name,
          }
        },


    }
});



export const { login,setError, setUserDetails } = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
    try {
      const res = await instance.post('api/login/', {
        email: email,
        password: password,
      });
      if (res.status===200) {
      const access = res.data.access
      dispatch(
        login(res.data)
      );
      return access;
     }
     
    } catch (err) {
      console.error(err);
      console.log(err.response.data);
      if (err.response.status === 401) {
        dispatch(setError({ message: 'invalid credentials' }));
      }
    }
  };




export default authSlice.reducer;