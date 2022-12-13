import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { FC, useState } from "react";

const EditModal = ({ handleClickOpen, open, setOpen, task }: any) => {
  const [editedContent, setEditedContent] = useState(task.content);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (id: string, editedContent: string) => {
    // handleClose();
    console.log(id, editedContent, "editmodal handlesave");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle id="alert-dialog-title">Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          variant="standard"
          defaultValue={task.content}
          onChange={(e) => {
            console.log(e.target.value);
            setEditedContent(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleSave(task.id, editedContent);
          }}
        >
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
