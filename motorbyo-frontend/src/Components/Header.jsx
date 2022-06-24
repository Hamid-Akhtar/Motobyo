import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  FormGroup,
  MenuItem,
  Menu,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Header() {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAuth(false);
  };

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
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employees
          </Typography>

          {auth && (
            <div>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  handleClose();
                  navigate("/login");
                  localStorage.removeItem("user");
                }}
                color="inherit"
              >
                logout
              </IconButton>
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/login");
                    localStorage.removeItem("user");
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu> */}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
