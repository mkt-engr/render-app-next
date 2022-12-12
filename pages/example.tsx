import { GetStaticProps, NextPage } from "next";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import React, { useState } from "react";

type Task = {
  id: number;
  content: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  tasks: Task[];
};

const Example: NextPage<Props> = ({ tasks }) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1, maxWidth: 500, mx: "auto" }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={12}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Please Add Your Task!!
            </Typography>

            <Paper
              component="form"
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
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <AddIcon />
              </IconButton>
            </Paper>
            <List>
              {tasks.map((task) => {
                return (
                  <ListItem
                    key={task.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={task.content} />
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
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
      tasks: data,
    },
  };
};
