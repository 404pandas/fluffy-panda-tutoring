import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { moveAnimal } from "../../store/slices/domTravSlice";
import "./textinput.css";

const TextInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const position = useSelector(
    (state: RootState) => state.domTrav.animalPosition
  );

  const [command, setCommand] = useState("");

  useEffect(() => {
    setCommand("");
  }, [position]);

  const executeCommand = () => {
    const trimmedCommand = command.trim().toLowerCase();

    console.log("Executing command:", trimmedCommand);

    setCommand("");

    let { row, col } = position;
    console.log("Current position:", "row:", row, "col:", col);

    switch (trimmedCommand) {
      case "moveup":
        row += 2;
        break;
      case "movedown":
        row -= 2;
        break;
      case "moveleft":
        col--;
        break;
      case "moveright":
        col++;
        break;
    }
    dispatch(moveAnimal({ row, col }));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <Typography variant='h6'>
          Enter a command to move the animal:
        </Typography>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          <li>
            <Typography variant='body1'>moveUp: Move the animal up</Typography>{" "}
          </li>
          <li>
            <Typography variant='body1'>
              moveDown: Move the animal down
            </Typography>
          </li>
          <li>
            <Typography variant='body1'>
              moveLeft: Move the animal left
            </Typography>
          </li>
          <li>
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
