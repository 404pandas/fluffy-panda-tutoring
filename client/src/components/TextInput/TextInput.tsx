import { Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { moveAnimal } from "../../store/slices/domTravSlice";
import "./textinput.css";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const TextInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const position = useSelector(
    (state: RootState) => state.domTrav.animalPosition
  );
  const avalibleMoves = useSelector(
    (state: RootState) => state.domTrav.availableMoves
  );

  const [command, setCommand] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for the input

  useEffect(() => {
    setCommand("");
    setAvailableClasses(
      avalibleMoves.map((move) => `${move.color} ${move.shape}`)
    );
  }, [position]);

  const executeCommand = () => {
    console.log("Executing command:", command);

    // ========== Temporary way to test the logic working ============
    let trimmedCommand = command.trim().toLowerCase();
    trimmedCommand = trimmedCommand.slice("querySelector(".length, -1);
    trimmedCommand = trimmedCommand.slice(1, -1);
    trimmedCommand = trimmedCommand.replace(".", "");
    console.log(trimmedCommand);

    // Find the matching move
    const matchingMove = avalibleMoves.find(
      (move) => `${move.color} ${move.shape}` === trimmedCommand
    );
    const direction = matchingMove?.movement;

    console.log(direction);

    // ========== Temporary way to test the logic working ============

    setCommand("");

    let { row, col } = position;
    console.log("Current position:", "row:", row, "col:", col);

    switch (direction) {
      case "moveUp":
        row += 2;
        break;
      case "moveDown":
        row -= 2;
        break;
      case "moveLeft":
        col--;
        break;
      case "moveRight":
        col++;
        break;
    }
    dispatch(moveAnimal({ row, col }));
  };

  const handleChange = (event: SelectChangeEvent<string>): void => {
    const selectedValue = event.target.value.toLowerCase(); // Convert to lowercase
    setSelectedClass(event.target.value);

    if (inputRef.current) {
      const input = inputRef.current;
      const cursorPosition = input.selectionStart || 0; // Current cursor position
      const currentCommand = command;

      // Check if cursor is inside the querySelector("")
      const querySelectorStart = currentCommand.indexOf('querySelector("');
      const querySelectorEnd = currentCommand.indexOf('")', querySelectorStart);

      if (
        querySelectorStart !== -1 &&
        cursorPosition > querySelectorStart &&
        cursorPosition <= querySelectorEnd
      ) {
        const beforeCursor = currentCommand.slice(0, cursorPosition);
        const afterCursor = currentCommand.slice(cursorPosition);

        const updatedCommand = `${beforeCursor}.${selectedValue}${afterCursor}`;
        setCommand(updatedCommand);

        // Place cursor after the inserted value
        setTimeout(() => {
          const newCursorPosition = cursorPosition + selectedValue.length + 1; // +1 for the period
          input.focus();
          input.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
      }
    }
  };

  const handleClick = (): void => {
    const newCommand = 'querySelector("")';
    setCommand(newCommand);

    // Wait for the state to update and place the cursor inside the parentheses
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const position = newCommand.indexOf('"') + 1; // Cursor inside the quotes
        inputRef.current.setSelectionRange(position, position);
      }
    }, 0);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <Typography variant='h6'>
          Enter a command to move the animal:
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Button variant='outlined' onClick={handleClick}>
              Insert querySelector()
            </Button>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='demo-simple-select-helper-label'>
                Classes
              </InputLabel>
              <Select
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={selectedClass}
                label='Select To Insert Classes'
                onChange={handleChange}
              >
                <MenuItem key='default' value='default' disabled>
                  <em>Available Classes</em>
                </MenuItem>
                {/* TODO- map through available classes coming through from redux */}
                {availableClasses.map((className) => (
                  <MenuItem key={className} value={className}>
                    {className}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Select to insert an available class
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <input
        type='text'
        value={command}
        ref={inputRef}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && executeCommand()}
        placeholder='Enter command (use the helpers above)'
        style={{
          padding: "8px",
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={executeCommand}
        style={{ padding: "8px", marginTop: "8px", width: "100%" }}
      >
        Execute Command
      </button>
    </div>
  );
};

export default TextInput;
