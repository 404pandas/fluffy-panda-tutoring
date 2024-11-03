import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import "./gameboard.css";

const GameBoard: React.FC = () => {
  const [rows, setRows] = useState<number[]>([1, 2, 3]);

  const addRow = () => {
    if (rows.length <= 18) {
      const newRows = [rows[0] + 3, rows[0] + 2, rows[0] + 1];
      setRows([...newRows, ...rows]);
    } else if (rows.length < 21) {
      const rowsToAdd = 21 - rows.length;
      const newRows = Array.from(
        { length: rowsToAdd },
        (_, i) => rows[0] + rowsToAdd - i
      );
      setRows([...newRows, ...rows]);
    } else {
      alert("You have reached the maximum number of rows.");
    }
  };

  const removeRow = () => {
    if (rows.length > 3) {
      setRows(rows.slice(3));
    } else {
      alert("You must have at least three rows.");
    }
  };

  return (
    <Box p={2}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { mobile: "column", tablet: "row" },
          mb: 2,
        }}
      >
        <Button
          variant='contained'
          onClick={addRow}
          disabled={rows.length >= 21}
        >
          Add Row
        </Button>
        <Button
          variant='contained'
          onClick={removeRow}
          disabled={rows.length <= 3}
        >
          Remove Row
        </Button>
      </Box>

      {rows.map((row, index) => (
        <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
          {Array.from({ length: 12 }).map((_, colIndex) => (
            <Grid
              xs={1}
              key={colIndex}
              sx={{
                border: "1px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50px",
                flexGrow: 1,
                flexBasis: "0%",
                minWidth: 0,
                typography: { mobile: "body2", tablet: "body1", laptop: "h6" },
              }}
            >
              {colIndex === 0 ? `Row ${rows.length - index}` : ""}
            </Grid>
          ))}
        </Grid>
      ))}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {Array.from({ length: 12 }).map((_, colIndex) => (
          <Grid
            xs={1}
            key={colIndex}
            sx={{
              border: "1px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50px",
              flexGrow: 1,
              flexBasis: "0%",
              minWidth: 0,
              typography: { mobile: "body2", tablet: "body1", laptop: "h6" },
            }}
          >
            Column {colIndex + 1}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameBoard;
