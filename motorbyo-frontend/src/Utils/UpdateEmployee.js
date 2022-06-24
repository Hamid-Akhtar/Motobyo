import React from "react";
import API from "../Constant/Api";
const UpdateEmployee = async (
  id,
  firstname,
  MiddleInitial,
  lastName,
  startDate,
  doE
) => {
  try {
    const res = await fetch(`${API.EMPLOYEE}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        _id: id,
        FirstName: firstname,
        MiddleInitial: MiddleInitial,
        LastName: lastName,
        DateOfBirth: startDate,
        DateOfEmployment: doE,
        Status: true,
      }),
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
export default UpdateEmployee;
