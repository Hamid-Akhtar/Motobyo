import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Switch,
  Grid,
  tableCellClasses,
} from "@mui/material";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import Header from "../../Components/Header";
import EmployeeForm from "./EmployeeForm";
import Model from "./Model";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  retrieveEmployee,
  createEmployee,
  updateEmployee,
} from "../../features/employee";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const initValue = {
  DateOfBirth: new Date(),
  DateOfEmployment: new Date(),
  FirstName: "",
  LastName: "",
  MiddleInitial: "",
  Status: true,
};

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [data, setData] = React.useState(initValue);
  const [id, setID] = React.useState("");
  const dispatch = useDispatch();
  //******************************************************************** */
  const employee = useSelector((state) => state.employee.value);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //************************************************************************ */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //******************************************************************** */
  const addEmployee = async (data) => {
    if (data?._id?.length > 0) {
      dispatch(updateEmployee(data));
      setData(initValue);
    } else {
      dispatch(createEmployee(data));
      setData(initValue);
    }
  };
  //************************************************************ */
  useEffect(() => {
    dispatch(retrieveEmployee());
  }, []);
  return (
    <>
      <Header />
      <Grid container style={{ marginBottom: "-22px" }}>
        <Grid md={12} lg={12}>
          <span
            style={{
              float: "right",
              marginRight: "30px",
              marginTop: "27px",
              cursor: "pointer",
            }}
          >
            Add User{" "}
            <span>
              <AddCircleIcon
                style={{
                  fontSize: "2rem",
                  marginBottom: "-8px",
                }}
                onClick={() => {
                  setOpen(true);
                  setChecked(true);
                }}
              />
            </span>
          </span>
        </Grid>
      </Grid>
      <Paper
        sx={{
          width: "97%",
          overflow: "hidden",
          textAlign: "center",
          margin: "30px",
        }}
      >
        <br />
        <TableContainer sx={{ maxHeight: 1000 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="">FirstName</StyledTableCell>
                <StyledTableCell align="">MiddleInitail</StyledTableCell>
                <StyledTableCell align="">LastName</StyledTableCell>
                <StyledTableCell align="center">Date Of Birth</StyledTableCell>
                <StyledTableCell align="center">
                  Date Of Employeement
                </StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employee?.data !== undefined ? (
                <>
                  {employee?.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {row.FirstName}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.MiddleInitial}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.LastName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {moment(row.DateOfBirth).format("MMMM Do YYYY")}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {moment(row.DateOfEmployment).format(
                              "MMMM Do YYYY"
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Switch
                              checked={row.Status}
                              onChange={(e) => {
                                setID(row._id);
                                setShow(true);
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <EditIcon
                              onClick={() => {
                                setChecked(false);
                                setOpen(true);
                                setData(row);
                              }}
                              style={{ cursor: "pointer" }}
                            />{" "}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </>
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={employee?.data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <EmployeeForm
        open={open}
        setOpen={setOpen}
        data={data}
        checked={checked}
        addEmployee={addEmployee}
      />
      <Model show={show} setShow={setShow} id={id} />
    </>
  );
}
