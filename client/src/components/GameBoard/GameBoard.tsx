import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Animal from "../Animal/Animal";
import TextInput from "../TextInput/TextInput";
import "./gameboard.css";

const GameBoard: React.FC = () => {
  const [rows, setRows] = useState<number[]>([1, 2, 3]);
  const [animalPosition, setAnimalPosition] = useState<{
    row: number;
    col: number;
  }>({
    row: 0,
    col: 5,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleMove = (newRow: number, newCol: number) => {
    const validRows = [0, 3, 6, 9, 12, 15, 18];

    if (validRows.includes(newRow) && newCol >= 0 && newCol < 12) {
      setAnimalPosition({ row: newRow, col: newCol });
      setErrorMessage(null);
    } else {
      setErrorMessage(
        "Invalid move. Animal can only move to valid rows (1, 3, 6, etc.) and within column limits."
      );
    }
  };

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

      {/* Main Grid with Static Rows and Columns */}
      {rows
        .slice()
        .reverse()
        .map((_, rowIndex) => (
          <Grid container spacing={2} key={rowIndex} sx={{ mt: 1 }}>
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
                }}
              >
                {/* Render row labels in the first column */}
                {colIndex === 0
                  ? `Row ${rows[rows.length - 1 - rowIndex]}`
                  : ""}
                {/* Render Animal in the designated cell */}
                {animalPosition.row === rows.length - 1 - rowIndex &&
                animalPosition.col === colIndex &&
                colIndex !== 0 ? (
                  <Animal />
                ) : (
                  ""
                )}
              </Grid>
            ))}
          </Grid>
        ))}

      {/* Static Column Headers */}
      <Grid container spacing={1} sx={{ mt: 1 }}>
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
            }}
          >
            {`Column ${colIndex + 1}`}
          </Grid>
        ))}
      </Grid>

      {/* TextInput for moving the Animal */}
      <TextInput onMove={handleMove} maxRows={rows.length} maxCols={12} />

      {/* Error message display */}
      {errorMessage && <Box sx={{ color: "red", mt: 2 }}>{errorMessage}</Box>}
    </Box>
  );
};

export default GameBoard;
