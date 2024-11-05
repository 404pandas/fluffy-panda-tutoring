import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { addRow, removeRow } from "../../store/slices/domTravSlice";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Animal from "../Animal/Animal";
import TextInput from "../TextInput/TextInput";
import "./gameboard.css";

const GameBoard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rows = useSelector((state: RootState) => state.domTrav.rows);
  const animalPosition = useSelector(
    (state: RootState) => state.domTrav.animalPosition
  );
  const errorMessage = useSelector(
    (state: RootState) => state.domTrav.errorMessage
  );

  return (
    <Box p={2}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          mb: 2,
        }}
      >
        <Button
          variant='contained'
          onClick={() => dispatch(addRow())}
          disabled={rows.length >= 21}
        >
          Add Row
        </Button>
        <Button
          variant='contained'
          onClick={() => dispatch(removeRow())}
          disabled={rows.length <= 3}
        >
          Remove Row
        </Button>
      </Box>

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
                {colIndex === 0
                  ? `Row ${rows[rows.length - 1 - rowIndex]}`
                  : ""}
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

      <TextInput maxRows={5} maxCols={5} />

      {errorMessage && <Box sx={{ color: "red", mt: 2 }}>{errorMessage}</Box>}
    </Box>
  );
};

export default GameBoard;
