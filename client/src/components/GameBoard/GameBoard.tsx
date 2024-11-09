import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {addRow, newGame, removeRow} from "../../store/slices/domTravSlice";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Animal from "../Animal/Animal";
import TextInput from "../TextInput/TextInput";
import DomTravSettings from "../DomTravSettings/DomTravSettings";
import Modal from "@mui/material/Modal";

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
  const obstacleCount = useSelector(
    (state: RootState) => state.domTrav.obstacleCount
  );
  const areObstaclesAnimated = useSelector(
    (state: RootState) => state.domTrav.areObstaclesAnimated
  );
  const [obstaclePositions, setObstaclePositions] = useState<{
    [key: number]: number;
  }>({});
  const gameplayState = useSelector(
    (state: RootState) => state.domTrav.gameplayState
  );

  useEffect(() => {
    const positions: { [key: number]: number } = {};
    const maxColumns = 11;
    const allowedRows = rows.filter((_, index) => index % 2 === 1);

    allowedRows.forEach((row, index) => {
      if (index < obstacleCount) {
        positions[row] = Math.floor(Math.random() * maxColumns) + 1;
      }
    });

    setObstaclePositions(positions);
  }, [rows, obstacleCount]);

  const renderGameGrid = () => (
    <>
      {rows
        .slice()
        .reverse()
        .map((_, rowIndex) => (
          <Grid
            container
            spacing={2}
            key={rowIndex}
            sx={{ mt: 2 }}
            wrap="nowrap"
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
                {rowIndex % 2 === 1 &&
                  colIndex ===
                  obstaclePositions[rows[rows.length - 1 - rowIndex]] && (
                    <Box
                      className={`obstacle ${
                        areObstaclesAnimated ? "animated" : ""
                      }`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "red",
                      }}
                    />
                  )}
              </Grid>
            ))}
          </Grid>
        ))}
    </>
  );

  return (
    <Box p={2}>
      {gameplayState === "settings" && <DomTravSettings />}

      {gameplayState === "playing" && (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => dispatch(newGame())}
            >
              Reset
            </Button>
            {/*<Button*/}
            {/*  variant="contained"*/}
            {/*  onClick={() => dispatch(addRow())}*/}
            {/*  disabled={rows.length >= 21}*/}
            {/*>*/}
            {/*  Add Row*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*  variant="contained"*/}
            {/*  onClick={() => dispatch(removeRow())}*/}
            {/*  disabled={rows.length <= 3}*/}
            {/*>*/}
            {/*  Remove Row*/}
            {/*</Button>*/}
          </Box>
          {renderGameGrid()}

          <TextInput />
        </>
      )}

      {gameplayState === "paused" && (
        <>
          {renderGameGrid()}
          <Modal open={true}>
            <Box className="modal-overlay">
              <h2>Game Paused</h2>
              <p>Resume or exit?</p>
              <Button variant="contained">Resume</Button>
              <Button variant="outlined">Exit</Button>
            </Box>
          </Modal>
        </>
      )}

      {gameplayState === "ended" && (
        <>
          {renderGameGrid()}
          <Modal open={true}>
            <Box className="modal-overlay">
              <h2>Game Over</h2>
              <p>Thanks for playing!</p>
              <Button variant="contained">Play Again</Button>
              <Button variant="outlined">Exit</Button>
            </Box>
          </Modal>
        </>
      )}
      {errorMessage && <Box sx={{ color: "red", mt: 2 }}>{errorMessage}</Box>}
    </Box>
  );
};

export default GameBoard;
