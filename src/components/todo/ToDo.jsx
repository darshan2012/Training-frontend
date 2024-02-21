import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { AddTodo } from "./components/AddTodo";
import ListTodo from "./components/ListTodo";
import { TodoProvider } from "./contexts";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, todo: text } : prevTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  
  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleted }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        // width={"60%"}
        // style={{ height: "300px", overflow: "scroll" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h3" gutterBottom align="center">
              Todo App
            </Typography>
            <AddTodo />
            <ListTodo />
          </Paper>
        </Grid>
      </Grid>
    </TodoProvider>
  );
};

export default Todo;
