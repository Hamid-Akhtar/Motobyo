import React, { useState, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "../../App.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EmployeeSchema = Yup.object().shape({
  FirstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  MiddleInitial: Yup.string().max(50, "Too Long!").required("Required"),
  LastName: Yup.string().max(50, "Too Long!").required("Required"),
});

export default function EmployeeForm({ open, setOpen, data, addEmployee }) {
  const DOB = useRef(null);
  const DOE = useRef(null);
  const [startDate, setStartDate] = useState(data.DateOfBirth);
  const [doE, setDoE] = useState(data.DateOfEmployment);
  const handleClose = () => {
    setOpen(false);
  };

  function handleDOB() {
    const datepickerElement = DOB.current;
    datepickerElement.setFocus(true);
  }
  function handleDOE() {
    const datepickerElement = DOE.current;
    datepickerElement.setFocus(true);
  }

  return (
    <div>
      {" "}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <Formik
          initialValues={data}
          onSubmit={(values, { setSubmitting }) => {
            console.log("val", values);
            setTimeout(() => {
              let data = {
                ...values,
                startDate,
                doE,
              };
              addEmployee(data);
              handleClose();
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={EmployeeSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form>
              {console.log("error", errors)}
              <DialogTitle id="alert-dialog-title">
                Add or edit Employee
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="FirstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.FirstName}
                    onChange={handleChange}
                    error={errors.FirstName}
                  />
                  {errors.FirstName && touched.FirstName && (
                    <div className="input-feedback" style={{ color: "red" }}>
                      {errors.FirstName}
                    </div>
                  )}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Middle Initial"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="MiddleInitial"
                    value={values.MiddleInitial}
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="LastName"
                    value={values.LastName}
                    onChange={handleChange}
                  />

                  <Grid container style={{ margin: "2vh 0 1vh 0" }}>
                    <Grid md={4}>Date Of Birth : </Grid>
                    <Grid md={8}>
                      {" "}
                      <span style={{ float: "left" }}>
                        {" "}
                        <DatePicker
                          selected={startDate}
                          onChange={(e) => {
                            setStartDate(e);
                          }}
                          ref={DOB}
                        />{" "}
                      </span>{" "}
                      <span
                        onClick={() => {
                          handleDOB();
                        }}
                      >
                        <CalendarTodayIcon />
                      </span>
                    </Grid>
                  </Grid>
                  <hr />
                  <Grid container style={{ margin: "2vh 0 1vh 0" }}>
                    <Grid md={4}>Date Of Employment : </Grid>
                    <Grid md={8}>
                      {" "}
                      <span style={{ float: "left" }}>
                        {" "}
                        <DatePicker
                          selected={doE}
                          onChange={(e) => {
                            setDoE(e);
                          }}
                          ref={DOE}
                        />
                      </span>{" "}
                      <span
                        onClick={() => {
                          handleDOE();
                        }}
                      >
                        <CalendarTodayIcon />
                      </span>
                    </Grid>
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>cancel</Button>
                <Button
                  type="submit"
                  // onClick={() => {
                  //   addEmployee(id, firstname, lastName, startDate, doE);
                  // }}
                  autoFocus
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>{" "}
      </Dialog>
    </div>
  );
}
