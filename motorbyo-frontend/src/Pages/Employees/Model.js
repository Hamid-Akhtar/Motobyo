import React, { useState, useRef, useEffect, memo } from "react";
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
const Model = ({ show, setShow, DeleteEmploye }) => {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Deactivate</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to Delete or Deactivate?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button
            onClick={() => {
              DeleteEmploye();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default memo(Model);
