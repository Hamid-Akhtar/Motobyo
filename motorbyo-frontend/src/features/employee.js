import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DeleteEmployee from "../Utils/DeleteEmployee";
import AddEmployee from "../Utils/AddEmployee";
import GetEmp from "../Utils/GetEmployee";
import UpdateEmployee from "../Utils/UpdateEmployee";
import { toast } from "react-toastify";

export const createEmployee = createAsyncThunk(
  "employee/create",
  async (data) => {
    const res = await AddEmployee(data);
    return res;
  }
);
export const retrieveEmployee = createAsyncThunk(
  "employee/retrieve",
  async () => {
    const res = await GetEmp();
    return res;
  }
);
export const updateEmployee = createAsyncThunk(
  "employee/update",
  async (data) => {
    const res = await UpdateEmployee(data);
    return res;
  }
);
export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id) => {
    const res = await DeleteEmployee(id);
    return res;
  }
);

const initState = { data: [] };
export const employeeSlice = createSlice({
  name: "employee",

  initialState: { value: initState },

  extraReducers: {
    [createEmployee.fulfilled]: (state, action) => {
      toast.success("Employee Successfully Created");
      state.value.data.push(action.payload);
    },
    [retrieveEmployee.fulfilled]: (state, action) => {
      state.value.data = [...action.payload];
    },
    [updateEmployee.fulfilled]: (state, action) => {
      toast.success("Employee Successfully Updated");
      const index = state.value.data.findIndex(
        (employee) => employee._id === action.payload._id
      );
      state.value.data[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      toast.success("Employee Successfully Deleted");
      state.value.data = [...action.payload];
    },
  },
});

export const { reducer } = employeeSlice.actions;

export default employeeSlice.reducer;
