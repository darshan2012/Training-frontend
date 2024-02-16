import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useTodo } from "../contexts";

export const AddTodo = () => {
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoText = e.target.todo.value.trim();
    if (todoText !== "") {
      addTodo({
        id: Date.now(),
        text: todoText,
        completed: false,
      });
      e.target.reset();
    }
  };

  return (
    <Grid
      component={"form"}
      onSubmit={handleSubmit}
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={8} sm={9}>
        <TextField
          name="todo"
          variant="outlined"
          label="Enter a new todo"
          fullWidth
        />
      </Grid>
      <Grid item xs={4} sm={3}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Todo
        </Button>
      </Grid>
    </Grid>
  );
};
