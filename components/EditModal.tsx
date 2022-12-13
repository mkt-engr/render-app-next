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
  const [editedContent, setEditedContent] = useState(task?.content || "");
  console.log({ editedContent }, "EditModalの最初");
  const handleClose = () => {
    setEditedContent(task.content);
    setOpen(false);
  };
  const handleSubmit = (
    e: SyntheticEvent,
    task: Task,
    editedContent: string
  ) => {
    e.preventDefault();
    handleClose();
    console.log({ editedContent, task: task.content }, "handleSubmitの中");
    if (task.content === editedContent) {
      console.log("タスクの中身は変更されてない");
      return;
    }
    setEditedContent(editedContent);

    handleSave(task, editedContent);
  };

  const handleSave = async (task: Task, editedContent: string) => {
    const { id } = task;

    handleClose();

    const options: AxiosRequestConfig = {
      url: `api/task/${id}`,
      method: "PATCH",
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
      data: { content: editedContent },
    };

    const { data } = await axios(options);

    setEditedContent(editedContent);
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
          handleSubmit(e, task, editedContent);
        }}
      >
        <DialogTitle id="alert-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            defaultValue={editedContent}
            onChange={(e) => {
              // console.log(e.target.value, "TextField");
              setEditedContent(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              console.log({ task: task.content, editedContent });

              handleSave(task, editedContent);
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
