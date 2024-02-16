import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import TodoItem from "./TodoItem";
import { useTodo } from "../contexts/TodoContext";

function ListTodo() {
  const { todos } = useTodo();
  return (
    <List sx={{ height: "300px", overflow: "scroll" }}>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            <TodoItem todo={todo} />
          </div>
        ))}
    </List>
  );
}

export default ListTodo;
