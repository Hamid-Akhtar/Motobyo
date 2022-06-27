import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoginUser from "../Utils/LoginUser";

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const loginUser = createAsyncThunk("employee/create", async (data) => {
  const res = await LoginUser(data);
  return res;
});
export const userSlice = createSlice({
  name: "user",

  initialState: { user: initialUser },
  reducers: {
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      // toast.success("Employee Successfully Created");
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
