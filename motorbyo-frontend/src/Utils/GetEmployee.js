import React from "react";

import API from "../Constant/Api";
const GetEmp = async () => {
  try {
    var token = JSON.parse(localStorage.getItem("user"));
    const res = await fetch(API.EMPLOYEE, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const result = await res.json();
    if (res.status == 200) {
      return result;
    }
  } catch {}
};
export default GetEmp;
