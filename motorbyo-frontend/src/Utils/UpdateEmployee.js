import API from "../Constant/Api";
const UpdateEmployee = async ({
  _id,
  FirstName,
  MiddleInitial,
  LastName,
  startDate,
  doE,
}) => {
  try {
    const token = JSON.parse(localStorage.getItem("user"));
    const res = await fetch(`${API.EMPLOYEE}/${_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        _id,
        FirstName,
        MiddleInitial,
        LastName,
        DateOfBirth: startDate,
        DateOfEmployment: doE,
        Status: true,
      }),
    });
    const result = await res.json();
    if (res.status === 200) {
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};
export default UpdateEmployee;
