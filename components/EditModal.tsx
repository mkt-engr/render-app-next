import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { Task } from "../@types/type";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  task: Task;
  setTasks: Dispatch<SetStateAction<Task[]>>;
};
const EditModal: FC<Props> = ({ open, setOpen, task, setTasks }) => {
  const [editedContent, setEditedContent] = useState(task.content);

  const handleClose = () => {
    setEditedContent(task.content);
    setOpen(false);
  };
  const handleSubmit = (
    e: SyntheticEvent,
    id: number,
    editedContent: string
  ) => {
    e.preventDefault();
    handleSave(id, editedContent);
  };

  const handleSave = async (id: number, editedContent: string) => {
    handleClose();

    const options: AxiosRequestConfig = {
      url: `api/task/${id}`,
      method: "PATCH",

      data: { content: editedContent },
    };

    const { data } = await axios(options);

    setTasks((prevTasks: Task[]) => {
      const newTasks = prevTasks.map((task) => {
        if (task.id !== data.id) return task;
        return { ...task, content: editedContent };
      });
      return newTasks;
    });
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
      <form
        onSubmit={(e) => {
          handleSubmit(e, task.id, editedContent);
        }}
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
      </form>
    </Dialog>
  );
};

export default EditModal;
