import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { Formik, Form } from "formik";
import LoginUser from "../../Utils/LoginUser";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { toast } from "react-toastify";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});

const initialValues = {
  email: "",
  password: "",
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MotoByo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    let res = await LoginUser(values);
    if (res.accessToken !== undefined) {
      localStorage.setItem("user", JSON.stringify(res.accessToken));
      dispatch(login(values));
      toast.success("Successfully LogedIn");
      navigate("/employees");
    } else {
      toast.error("Invalid Email Or Password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            // display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            style={{ marginLeft: "43%" }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ marginLeft: "41%" }}>
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Logging in", values);

              setTimeout(() => {
                handleSubmit(values);
                localStorage.setItem(
                  "user",
                  JSON.stringify({ login: true, ...values })
                );
                setSubmitting(false);
              }, 500);
            }}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form component="form" sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  autoFocus
                />
                {errors.email && touched.email && (
                  <div className="input-feedback" style={{ color: "red" }}>
                    {errors.email}
                  </div>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  id="password"
                  autoComplete="current-password"
                />
                {errors.password && touched.password && (
                  <div className="input-feedback" style={{ color: "red" }}>
                    {errors.password}
                  </div>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
