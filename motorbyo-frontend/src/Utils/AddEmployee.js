import API from "../Constant/Api";
const AddEmployee = async ({
  FirstName,
  MiddleInitial,
  LastName,
  startDate,
  doE,
}) => {
  try {
    var token = JSON.parse(localStorage.getItem("user"));
    const res = await fetch(API.EMPLOYEE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        FirstName,
        MiddleInitial,
        LastName,
        DateOfBirth: startDate,
        DateOfEmployment: doE,
        Status: true,
      }),
    });

    const data = await res.json();
    if (res.status === 200) {
      return data;
    }
  } catch (err) {
    console.log("error", err);
  }
};
export default AddEmployee;
