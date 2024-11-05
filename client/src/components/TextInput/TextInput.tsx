import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { moveAnimal } from "../../store/slices/domTravSlice";
import "./textinput.css";

interface TextInputProps {
  maxRows: number;
  maxCols: number;
}

const TextInput: React.FC<TextInputProps> = ({ maxRows, maxCols }) => {
  const dispatch = useDispatch<AppDispatch>();

  const position = useSelector(
    (state: RootState) => state.domTrav.animalPosition
  );

  const [command, setCommand] = useState("");

  useEffect(() => {
    setCommand("");
  }, [position]);

  const executeCommand = () => {
    console.log("Executing command:", command);
    console.log("Data type of command: " + typeof command);
    let { row, col } = position;
    console.log("Current position:", "row:", row, "col:", col);
    if (command === "moveUp" && row > 1) {
      console.log("Moving Up");
      row -= 2;
      console.log("Moving up to row:", row);
    } else if (command === "moveDown" && row < maxRows - 2) {
      console.log("Moving Down");
      row += 2;
      console.log("Moving up to row:", row);
    } else if (command === "moveLeft" && col > 0) {
      console.log("Moving Left");
      col--;
      console.log("Moving up to row:", row);
    } else if (command === "moveRight" && col < maxCols - 1) {
      console.log("Moving Right");
      col++;
      console.log("Moving up to row:", row);
    } else {
      console.log("Invalid command or out of bounds");
    }
    dispatch(moveAnimal({ row, col }));

    setCommand("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <Typography variant='h6'>
          Enter a command to move the animal:
        </Typography>
        <ul>
          <li>
            <Typography variant='body1'>moveUp: Move the animal up</Typography>
            <Typography variant='body1'>
              moveDown: Move the animal down
            </Typography>
            <Typography variant='body1'>
              moveLeft: Move the animal left
            </Typography>
            <Typography variant='body1'>
              moveRight: Move the animal right
            </Typography>
          </li>
        </ul>
      </div>
      <input
        type='text'
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && executeCommand()} // Execute on Enter key
        placeholder='Enter command (e.g., moveUp, moveDown)'
        style={{
          padding: "8px",
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={executeCommand} // Execute command on button click
        style={{ padding: "8px", marginTop: "8px", width: "100%" }}
      >
        Execute Command
      </button>
    </div>
  );
};

export default TextInput;
