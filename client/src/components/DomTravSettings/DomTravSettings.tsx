// DomTravSettings.tsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  setObstacleAnimation,
  setObstacleCount,
} from "../../store/slices/domTravSlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const DomTravSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const obstacleCount = useSelector(
    (state: RootState) => state.domTrav.obstacleCount
  );
  const areObstaclesAnimated = useSelector(
    (state: RootState) => state.domTrav.areObstaclesAnimated
  );

  const handleObstacleCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = parseInt(event.target.value, 10);
    if (!isNaN(count) && count >= 0) {
      dispatch(setObstacleCount(count));
    }
  };

  const handleIncrement = () => {
    dispatch(setObstacleCount(obstacleCount + 1));
  };

  const handleDecrement = () => {
    if (obstacleCount > 0) {
      dispatch(setObstacleCount(obstacleCount - 1));
    }
  };

  const handleAnimationToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setObstacleAnimation(event.target.checked));
  };

  return (
    <Box p={2} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant='h6'>Settings</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant='outlined'
          onClick={handleDecrement}
          disabled={obstacleCount <= 0}
        >
          -
        </Button>

        <TextField
          label='Number of Obstacles'
          type='number'
          value={obstacleCount}
          onChange={handleObstacleCountChange}
          inputProps={{ min: 0 }}
          sx={{ width: 80, textAlign: "center" }}
        />

        <Button variant='outlined' onClick={handleIncrement}>
          +
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Animate Obstacles</Typography>
        <Switch
          checked={areObstaclesAnimated}
          onChange={handleAnimationToggle}
        />
      </Box>
    </Box>
  );
};

export default DomTravSettings;
