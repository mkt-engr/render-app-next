import { GetStaticProps, NextPage } from "next";
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
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { SyntheticEvent, useState } from "react";
import EditModal from "../components/EditModal";
import { Task } from "../@types/type";

type Props = {
  staticTasks: Task[];
};

const Example: NextPage<Props> = ({ staticTasks }) => {
  const [tasks, setTasks] = useState(staticTasks);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(staticTasks[0]);
  const [deletedTaskId, setDeletedTaskId] = useState(0);
  const [open, setOpen] = useState(false);

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
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
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

  const handleClickOpen = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: 500, mx: "auto" }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={12}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Please Add Your Task!!
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
                        }}
                      />
                      <Box sx={{ ml: "auto", mr: "4px" }}>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => {
                            handleClickOpen(task);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
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

      <EditModal
        open={open}
        setOpen={setOpen}
        task={selectedTask}
        setTasks={setTasks}
      />
    </>
  );
};

export default Example;

export const getServerSideProps: GetStaticProps = async () => {
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
