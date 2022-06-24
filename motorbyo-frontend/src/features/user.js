import { createSlice } from "@reduxjs/toolkit";
import LoginUser from "../Utils/LoginUser";

const initialStateValue = { email: "", data: [], token: false };
export const userSlice = createSlice({
  name: "user",

  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      console.log("redux paylodad", action);
      state.value = action.payload;
      let res = LoginUser(action.payload);
      if (res.accessToken !== undefined) {
        localStorage.setItem("user", JSON.stringify(res.accessToken));
        state.value = action.payload;
        state.value.token = true;
        window.history.pushState("/employees");
      }
    },

    // logout: (state) => {
    //   state.value = initialStateValue;
    // },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
