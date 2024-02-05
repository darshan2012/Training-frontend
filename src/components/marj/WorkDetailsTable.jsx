import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
// import { useNavigate } from "react-router-dom";
import { months } from "./months";

import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridEditInputCell,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = async () => {
    const _id = Date.now();
    setRows((oldRows) => [
      { _id, name: "", month: "", hours: 0, isNew: true },
      ...oldRows,
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [_id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <Button className="ms-auto me-4">
        <GridToolbarExport
          csvOptions={{
            fileName: "customerDataBase",
            delimiter: ";",
            // utf8WithBom: true,
          }}
          printOptions={{
            // pageStyle: '.MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }',
            fileName: "userWorkDetails",
            hideFooter: true,
            hideToolbar: true,
          }}
        />
      </Button>
    </GridToolbarContainer>
  );
}

export default function WorkDetailsTable() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  // const navigate = useNavigate();
  console.count();
  const fetchWorkDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}users/v1/workdetails`,
        {
          headers: {
            Authorization: localStorage.getItem("jwttoken"),
          },
        }
      );

      setRows(response.data.data.workDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWorkDetails();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (_id) => () => {
    setRowModesModel({ ...rowModesModel, [_id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (_id) => () => {
    setRowModesModel({ ...rowModesModel, [_id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (_id) => () => {
    // Send delete request to backend
    axios
      .delete(`${process.env.REACT_APP_URL}users/v1/workdetails/${_id}`, {
        headers: {
          Authorization: localStorage.getItem("jwttoken"),
        },
      })
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row._id !== _id));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleCancelClick = (_id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [_id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === _id);
    if (editedRow.isNew) {
      setRows((prevRows) => prevRows.filter((row) => row._id !== _id));
    }
  };

  const processRowUpdate = async (newRow) => {
    // Update row on the backend
    // console.log("new ", newRow);
    if (newRow.hours < 0) {
      newRow.hours *= -1;
    }
    if (newRow.isNew) {
      let id;

      await axios
        .post(
          `${process.env.REACT_APP_URL}users/v1/workdetails/`,
          { name: newRow.name, month: newRow.month, hours: newRow.hours },
          {
            headers: {
              Authorization: localStorage.getItem("jwttoken"),
            },
          }
        )
        .then((res) => {
          setRows(res.data.data.workDetails);
          return newRow;
        })
        .catch((error) => {
          console.error("Error adding data:", error);
          return;
        });
    } else {
      axios
        .put(
          `${process.env.REACT_APP_URL}users/v1/workdetails/${newRow._id}`,
          newRow,
          {
            headers: {
              Authorization: localStorage.getItem("jwttoken"),
            },
          }
        )
        .then(() => {
          const updatedRow = { ...newRow, isNew: false };
          setRows((prevRows) =>
            prevRows.map((row) => (row._id === newRow._id ? updatedRow : row))
          );
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }

    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
    },
    {
      field: "month",
      headerName: "Month",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: months,
    },
    {
      field: "hours",
      headerName: "Hours",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,

      valueFormatter: ({ value }) =>
        new Intl.NumberFormat(value).format(value < 0 ? value * -1 : value),
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            min: 0,
          }}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      className="box-shadow p-3 col-lg-7 col-12"
      sx={{
        height: "500px",
        // width: "60%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <h3 className="mb-3">User Work Details</h3>

      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        hideFooterSelectedRowCount={true}
        // autoHeight={true}
        autoPageSize={true}
        sx={{ maxHeight: "400px" }}
        density="standard"
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
