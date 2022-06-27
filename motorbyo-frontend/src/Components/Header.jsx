import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/user";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  FormGroup,
} from "@mui/material";

export default function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup></FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employees
          </Typography>

          <div>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {
                navigate("/login");
                dispatch(logout());
              }}
              color="inherit"
            >
              logout
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
