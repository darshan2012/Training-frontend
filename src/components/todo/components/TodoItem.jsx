import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { useTodo } from "../contexts";
import CancelIcon from "@mui/icons-material/Cancel";

const TodoItem = ({ todo }) => {
  const { toggleCompleted, deleteTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleCheckboxChange = () => {
    toggleCompleted(todo.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateTodo(todo.id, editedText);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(todo.text);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <ListItem
      sx={{
        backgroundColor: "#f0f0f0",
        marginBottom: "8px",
        borderRadius: "8px",
        padding: "8px",
        alignItems: "center",
      }}
    >
      <Checkbox checked={todo.completed} onChange={handleCheckboxChange} />
      {isEditing ? (
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={6}>
            <TextField
              value={editedText}
              onChange={handleTextChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={handleSaveClick}
              variant="contained"
              color="primary"
              size="small"
              sx={{ width: "100%" }}
            >
              <SaveIcon /> Save
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={handleCancelClick}
              variant="contained"
              color="secondary"
              size="small"
              sx={{ width: "100%" }}
            >
              <CancelIcon /> Cancel
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>
          <ListItemText
            primary={editedText}
            sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
          />
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteTodo(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default TodoItem;
