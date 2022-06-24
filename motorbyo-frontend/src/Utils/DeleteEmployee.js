import React from "react";
import API from "../Constant/Api";
const DeleteEmployee = async (id) => {
  try {
    var token = JSON.parse(localStorage.getItem("user"));
    const res = await fetch(`${API.EMPLOYEE}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const result = await res.json();
    if (res.status == 200) {
      console.log(result);
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};
export default DeleteEmployee;
