import { GetStaticProps, NextPage } from "next";
import axios from "axios";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { SyntheticEvent, useState } from "react";

type Task = {
  id: number;
  content: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  staticTasks: Task[];
};
//TODO: タスクをDBに追加→レスポンスのタスクをuseStateに保存
//TODO:RHFでonSubmitした時に値を取得する
//TODO:タスクがDoneになった時テキストに線を入れる
//TODO:Editボタン押したらモーダルで編集できるように
//TODO:ゴミ箱ボタン押したら物理削除する
const Example: NextPage<Props> = ({ staticTasks }) => {
  const [tasks, setTasks] = useState(staticTasks);
  const [isEditMode, setEditMode] = useState(false);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("handleSubmit", e);
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
    <div>
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
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
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
                            sx={{ pl: 0 }}
                            checked={task.done}
                            value={task.id}
                            onChange={handleTaskStatus}
                          />
                        }
                        label={task.content}
                      />
                      {/* <ListItemText primary={task.content} /> */}
                      <Box sx={{ ml: "auto" }}>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => {
                            setEditMode((prev) => {
                              return !prev;
                            });
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
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
    </div>
  );
};

export default Example;

export const getServerSideProps: GetStaticProps = async () => {
  console.log(process.env.HOST, "HOST");
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
