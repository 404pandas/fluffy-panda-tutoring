// DomTravSettings.tsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  GameSettings,
  startGame,
  updateColumnSettings,
  updateRowSettings,
} from "../../store/slices/domTravSlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { ObstacleSpeed } from "../../store/slices/domTravSlice"; // Import the enum if needed

import {
  getRandomElement,
  PRESET_COLORS,
  PRESET_SHAPES,
} from "../../utils/presets";

const DomTravSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select current settings from Redux
  const currentSettings = useSelector(
    (state: RootState) => state.domTrav.currentSettings
  );

  // Local state for settings, initialized from Redux
  const [length, setLength] = useState<number>(currentSettings.length);
  const [density, setDensity] = useState<number>(currentSettings.density);
  const [speed, setSpeed] = useState<string>(
    ObstacleSpeed[currentSettings.obstacleSetting]
  );

  useEffect(() => {
    // Initialize local state with Redux currentSettings on load
    setLength(currentSettings.length);
    setDensity(currentSettings.density);
    setSpeed(ObstacleSpeed[currentSettings.obstacleSetting]);
  }, [currentSettings]);

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = Math.max(
      1,
      Math.min(10, parseInt(event.target.value, 10) || 1)
    );
    setLength(newLength);

    // Update row settings in Redux when length changes
    const newRowSettings = generateRowSettings(newLength);
    dispatch(updateRowSettings(newRowSettings));
  };

  const handleDensityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDensity(
      Math.max(1, Math.min(10, parseInt(event.target.value, 10) || 1))
    );
  };

  const handleSpeedChange = (newSpeed: string | null) => {
    if (newSpeed !== null) {
      setSpeed(newSpeed);
    }
  };

  const generateRowSettings = (numRows: number) => {
    const rowSettings = Array.from(
      { length: Math.max(numRows, 1) },
      (_, index) => ({
        row: index + 1,
        color: getRandomElement(PRESET_COLORS),
      })
    );
    // Dispatch row settings to Redux
    dispatch(updateRowSettings(rowSettings));
    return rowSettings;
  };

  const generateColumnSettings = (numCols: number) => {
    const columnSettings = Array.from({ length: numCols }, (_, index) => ({
      col: index + 1,
      shape: getRandomElement(PRESET_SHAPES),
    }));
    // Dispatch column settings to Redux
    dispatch(updateColumnSettings(columnSettings));
    return columnSettings;
  };

  const handleStartGame = () => {
    // Convert speed to the appropriate enum value
    const obstacleSetting: ObstacleSpeed =
      speed === "Static"
        ? ObstacleSpeed.Static
        : speed === "Slow"
        ? ObstacleSpeed.Slow
        : ObstacleSpeed.Fast;

    const settings: GameSettings = {
      length,
      density,
      obstacleSetting, // Correct property name and type
      rowSettings: generateRowSettings(length),
      columnSettings: generateColumnSettings(12), // Adjust this if needed
    };

    if (settings.rowSettings.length === 0) {
      console.error("Row settings are empty");
    }
    dispatch(startGame(settings));
  };

  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        minWidth: "500px",
      }}
    >
      <Typography variant='h6'>Settings</Typography>

      {/* Length Selector */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant='outlined'
          onClick={() => setLength(length - 1)}
          disabled={length <= 1}
        >
          -
        </Button>
        <TextField
          label='Length'
          type='number'
          value={length}
          onChange={handleLengthChange}
          inputProps={{ min: 1, max: 10 }}
          sx={{ width: 80, textAlign: "center" }}
        />
        <Button
          variant='outlined'
          onClick={() => setLength(length + 1)}
          disabled={length >= 10}
        >
          +
        </Button>
      </Box>

      {/* Density Selector */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant='outlined'
          onClick={() => setDensity(density - 1)}
          disabled={density <= 1}
        >
          -
        </Button>
        <TextField
          label='Density'
          type='number'
          value={density}
          onChange={handleDensityChange}
          inputProps={{ min: 1, max: 10 }}
          sx={{ width: 80, textAlign: "center" }}
        />
        <Button
          variant='outlined'
          onClick={() => setDensity(density + 1)}
          disabled={density >= 10}
        >
          +
        </Button>
      </Box>

      {/* Speed Selector */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>Speed</Typography>
        <ToggleButtonGroup
          color='primary'
          value={speed}
          exclusive
          onChange={(_, newSpeed) => handleSpeedChange(newSpeed)}
          aria-label='Obstacle Speed'
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ToggleButton value='Static'>Static</ToggleButton>
          <ToggleButton value='Slow'>Slow</ToggleButton>
          <ToggleButton value='Fast'>Fast</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Start Game Button */}
      <Button variant='contained' color='primary' onClick={handleStartGame}>
        Start Game
      </Button>
    </Box>
  );
};

export default DomTravSettings;
