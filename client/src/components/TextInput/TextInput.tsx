import { Typography } from "@mui/material";
import React, { useState } from "react";
import "./textinput.css";
interface TextInputProps {
  onMove: (row: number, col: number) => void;
  maxRows: number;
  maxCols: number;
}

const TextInput: React.FC<TextInputProps> = ({ onMove, maxRows, maxCols }) => {
  const [command, setCommand] = useState("");
  const [position, setPosition] = useState<{ row: number; col: number }>({
    row: 0,
    col: 0,
  });

  const executeCommand = () => {
    let { row, col } = position;

    if (command === "moveUp" && row > 0) row--;
    else if (command === "moveDown" && row < maxRows - 1) row++;
    else if (command === "moveLeft" && col > 0) col--;
    else if (command === "moveRight" && col < maxCols - 1) col++;

    setPosition({ row, col });
    onMove(row, col);
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
        onKeyDown={(e) => e.key === "Enter" && executeCommand()}
        placeholder='Enter command (e.g., moveUp, moveDown)'
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
