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
          <Grid
            container
            spacing={2}
            key={rowIndex}
            sx={{ mt: 2 }}
            wrap='nowrap'
          >
            {Array.from({ length: 12 }).map((_, colIndex) => (
              <Grid
                xs={1}
                key={colIndex}
                sx={{
                  border: colIndex === 0 ? "none" : "1px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "60px",
                  width: "60px",
                  flexGrow: 0,
                  flexShrink: 0,
                }}
              >
                {colIndex === 0
                  ? `Row ${rows[rows.length - 1 - rowIndex]}`
                  : ""}
                {animalPosition.row === rows.length - rowIndex &&
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

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {Array.from({ length: 12 }).map((_, colIndex) => (
          <Grid
            xs={1}
            key={colIndex}
            sx={{
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "60px",
              width: "60px",
              flexGrow: 0,
              flexShrink: 0,
              visibility: colIndex == 0 ? "hidden" : "visible",
            }}
          >
            {`Column ${colIndex}`}
          </Grid>
        ))}
      </Grid>

      <TextInput />

      {errorMessage && <Box sx={{ color: "red", mt: 2 }}>{errorMessage}</Box>}
    </Box>
  );
};

export default GameBoard;
