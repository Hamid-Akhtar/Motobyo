import { createSlice } from "@reduxjs/toolkit";
import DeleteEmployee from "../Utils/DeleteEmployee";
import AddEmployee from "../Utils/AddEmployee";
import GetEmp from "../Utils/GetEmployee";
import UpdateEmployee from "../Utils/UpdateEmployee";
import axios from "axios";

import API from "../Constant/Api";

const token = JSON.parse(localStorage.getItem("user"));
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const initState = { data: [] };
export const employeeSlice = createSlice({
  name: "employee",

  initialState: { value: initState },

  reducers: {
    getEmployee: async (state, action) => {
      await axios.get(API.EMPLOYEE, config).then((res) => {
        console.log(res);
        state.value = res?.data;
      });
    },
    addEmployee: (state) => {
      state.value = initState;
    },
    updateEmployee: (state) => {
      state.value = initState;
    },
    deleteEmployee: (state, action) => {
      console.log("deleeeee", state.value);
      let res = DeleteEmployee(action.payload.id);
      state.value = res;
    },
  },
});

export const { getEmployee, addEmployee, updateEmployee, deleteEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
