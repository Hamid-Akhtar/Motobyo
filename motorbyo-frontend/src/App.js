import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./Pages/Login/Login";
import StickyHeadTable from "./Pages/Employees/EmployeesTable";

function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user !== "" && user !== undefined) {
      navigate("/employees");
    } else {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/employees" element={<StickyHeadTable />} />
      </Routes>
    </div>
  );
}

export default App;
