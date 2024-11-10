import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {exitGame, startGame, updateObstacles} from "../../store/slices/domTravSlice";
import confetti from "canvas-confetti";

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
  const animalPosition = useSelector((state: RootState) => state.domTrav.animalPosition);
  const errorMessage = useSelector((state: RootState) => state.domTrav.errorMessage);
  const obstacles = useSelector((state: RootState) => state.domTrav.obstacles); // Updated to use obstacles from Redux
  const gameplayState = useSelector((state: RootState) => state.domTrav.gameplayState);
  const currentSettings = useSelector((state: RootState) => state.domTrav.currentSettings);
  const obstacleSpeed = useSelector( (state: RootState) => state.domTrav.obstacleSpeed);

  const [movingObstacles, setMovingObstacles] = useState(obstacles);

  //Lets add some confetti
  // Confetti explosion effect
  const triggerConfettiExplosion = () => {
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  useEffect(() => {
    if (gameplayState === "won") {
      triggerConfettiExplosion(); // Trigger confetti explosion when game ends
    }

    if(gameplayState === "playing"){
      console.log("obstacleSpeed : " + obstacleSpeed)
      setMovingObstacles(obstacles);

      if (obstacleSpeed === 0) return; // Static mode, no movement

      const intervalDuration = obstacleSpeed === 1 ? 1000 : 500; // Slow or Fast intervals

      const interval = setInterval(() => {
        setMovingObstacles((prevObstacles) => {
          const updatedObstacles = prevObstacles.map((obstacle) => {
            const direction = Math.random() < 0.5 ? -1 : 1; // Random left or right movement
            const newCol = obstacle.col + direction;

            // Ensure the new position stays within bounds
            return {
              ...obstacle,
              col: Math.max(1, Math.min(newCol, 11)), // Keeps within column bounds (1 to 11)
            };
          });

          // Dispatch updated obstacles to Redux
          dispatch(updateObstacles(updatedObstacles));
          return updatedObstacles; // Update local state as well
        });
      }, intervalDuration);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [gameplayState]);

  // useEffect(() => {
  //   const positions: { [key: number]: number } = {};
  //   const maxColumns = 11;
  //   const allowedRows = rows.filter((_, index) => index % 2 === 1);
  //
  //   allowedRows.forEach((row, index) => {
  //     if (index < obstacleCount) {
  //       positions[row] = Math.floor(Math.random() * maxColumns) + 1;
  //     }
  //   });
  //
  //   setObstaclePositions(positions);
  // }, [rows, obstacleCount]);

  const renderGameGrid = () => (
    <>
      {rows
        .slice()
        .reverse()
        .map((rowNumber, rowIndex) => (
          <Grid
            container
            spacing={2}
            key={rowIndex}
            sx={{ mt: 2 }}
            wrap="nowrap"
          >
            {Array.from({ length: 12 }).map((_, colIndex) => {
              const isAnimalHere =
                animalPosition.row === rowNumber &&
                animalPosition.col === colIndex;
              const isObstacleHere = movingObstacles.some(
                (obstacle) => obstacle.row === rowNumber && obstacle.col === colIndex
              );

              return (
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
                    position: "relative",
                  }}
                >
                  {colIndex === 0 ? `Row ${rowNumber}` : ""}
                  {isAnimalHere && colIndex !== 0 && <Animal />}
                  {isObstacleHere && colIndex !== 0 && (
                    <Box
                      className={`obstacle`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "red",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                  )}
                </Grid>
              );
            })}
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
            <Button variant="contained" onClick={() => dispatch(exitGame())}>
              Reset
            </Button>
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

      {(gameplayState === "gameOver" || gameplayState === "won") && (
        <>
          {renderGameGrid()}
          <Modal open={true}>
            <Box
              className="modal-overlay"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "white",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                width: 300,
                textAlign: "center",
                opacity: "90%",
              }}
            >
              <h2>Game Over</h2>
              <p>Thanks for playing!</p>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => dispatch(startGame(currentSettings))}
                  sx={{ px: 3 }}
                >
                  Play Again
                </Button>
                <Button variant="outlined" onClick={() => dispatch(exitGame())} sx={{ px: 3 }}>
                  Exit
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
      {errorMessage && <Box sx={{ color: "red", mt: 2 }}>{errorMessage}</Box>}
    </Box>
  );
};

export default GameBoard;