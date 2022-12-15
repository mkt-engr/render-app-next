import { GetServerSideProps, NextPage } from "next";
import axios, { AxiosRequestConfig } from "axios";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { SyntheticEvent, useState } from "react";
import { Task } from "../@types/type";

type Props = {
  staticTasks: Task[];
};

const Example: NextPage<Props> = ({ staticTasks }) => {
  const [tasks, setTasks] = useState(staticTasks);
  const [newTask, setNewTask] = useState("");
  const [deletedTaskId, setDeletedTaskId] = useState(0);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const optionsPost: AxiosRequestConfig = {
      url: "api/task",
      method: "POST",
      data: { content: newTask },
    };
    const { data } = await axios(optionsPost);
    if (!data) return;
    setTasks((prev) => {
      return [...prev, data];
    });
    setNewTask("");
  };

  const handleDelete = async (id: number) => {
    const options: AxiosRequestConfig = {
      url: `api/task/${id}`,
      method: "DELETE",
      // headers: { "Accept-Encoding": "gzip,deflate,compress" },
    };
    const { data } = await axios(options);
    setTasks((prev) => {
      const newTasks = prev.filter((task) => {
        return task.id !== data.id;
      });
      return newTasks;
    });
  };

  const handleTaskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => {
        const selectedTaskId = Number(e.target.value);
        if (task.id === selectedTaskId) {
          return { ...task, done: !task.done };
        }
        return task;
      });
      return newTasks;
    });
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 500, mx: "auto" }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Please Add Your Task!! (Task limit is 10)
          </Typography>
          <form onSubmit={handleSubmit}>
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="New Task"
                inputProps={{ "aria-label": "new task" }}
                value={newTask}
                onChange={(e) => {
                  setNewTask(e.target.value);
                }}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSubmit}
              >
                <AddIcon />
              </IconButton>
            </Paper>
            <List>
              {tasks.map((task) => {
                return (
                  <ListItem key={task.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={task.done}
                          value={task.id}
                          onChange={handleTaskStatus}
                        />
                      }
                      label={task.content}
                      sx={{
                        textDecoration: task.done ? "line-through" : "auto",
                        wordBreak: "break-word",
                        flex: 1,
                        mr: 0,
                      }}
                    />
                    <Box sx={{ ml: "auto", mr: "4px" }}>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          setDeletedTaskId(task.id);
                          handleDelete(task.id);
                        }}
                        disabled={task.id === deletedTaskId}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Example;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${process.env.HOST}/tasks`, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });

  const data = res.data;
  return {
    props: {
      staticTasks: data,
    },
  };
};
