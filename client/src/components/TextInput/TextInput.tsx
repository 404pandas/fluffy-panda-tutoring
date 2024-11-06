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

  const maxRows = useSelector((state: RootState) => state.domTrav.maxRows);
  const maxCols = useSelector((state: RootState) => state.domTrav.maxCols);

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
    // if (trimmedCommand === "moveup" && row >= 0) {
    //   console.log("Moving Up");
    //   row += 2;
    //   console.log("Moving up to row:", row);
    // } else if (trimmedCommand === "movedown" && row - 2 >= 0) {
    //   console.log("Moving Down");
    //   row -= 2;
    //   console.log("Moving down to row:", row);
    // } else if (trimmedCommand === "moveleft" && col > 1) {
    //   console.log("Moving Left");
    //   col--;
    //   console.log("Moving left to column:", col);
    // } else if (trimmedCommand === "moveright" && col + 1 < maxCols) {
    //   console.log("Moving Right");
    //   col++;
    //   console.log("Moving right to column:", col);
    // } else {
    //   console.log("Invalid command or out of bounds"); return;
    // }
    switch(trimmedCommand){
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
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><Typography variant="body1">moveUp: Move the animal up</Typography> </li>
        <li><Typography variant="body1">moveDown: Move the animal down</Typography></li>
        <li><Typography variant="body1">moveLeft: Move the animal left</Typography></li>
        <li><Typography variant="body1">moveRight: Move the animal right</Typography></li>
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
