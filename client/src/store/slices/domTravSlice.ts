import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnimalPosition {
  row: number;
  col: number;
}
interface Obstacle {
  row: number;
  col: number;
}

export interface GameSettings {
  length: number;
  density: number;
  obstacleSetting: ObstacleSpeed;
  rowSettings: rowSettings[];
  columnSettings: columnSettings[];
}
export enum ObstacleSpeed {
  Static = 0,
  Slow = 1,
  Fast = 2,
}
enum GameplayState {
  Settings = "settings",
  Playing = "playing",
  Paused = "paused",
  GameOver = "gameOver",
  Won = "won",
}
interface rowSettings {
  row: number;
  color: string;
}

interface columnSettings {
  col: number;
  shape: string;
}

interface GameState {
  rows: number[];
  animalPosition: AnimalPosition;
  errorMessage: string | null;
  maxRows: number;
  maxCols: number;
  obstacleCount: number;
  obstacleSpeed: number;
  obstacles: Obstacle[];
  availableMoves: AvailableMoves[]
  gameplayState: GameplayState;
  currentSettings: GameSettings;
}

interface AvailableMoves {
  row : number,
  col : number,
  color : string,
  shape : string,
  movement : moveDirection,
}
enum moveDirection {
  Up = "moveUp",
  Down = "moveDown",
  Left = "moveLeft",
  Right = "moveRight",
}

const initialState: GameState = {
  rows: [1, 2, 3],
  animalPosition: { row: 1, col: 5 },
  errorMessage: null,
  maxRows: 3,
  maxCols: 12,
  obstacleCount: 3,
  obstacleSpeed: 0,
  obstacles: [],
  availableMoves: [],
  gameplayState: GameplayState.Settings,
  currentSettings: {
    length: 1,
    density: 1,
    obstacleSetting: ObstacleSpeed.Static,
    rowSettings: [],
    columnSettings: [],
  },
};

function generateObstacles(
  maxRows: number,
  maxCols: number,
  obstacleCount: number
): Obstacle[] {
  const obstacles: Obstacle[] = [];

  let count = 0;

  // Generate one obstacle on each obstacle row
  for (let row = 2; row < maxRows; row++) {
    if (row % 2 === 0) {
      // Only place obstacles on even rows
      const randomCol = Math.floor(Math.random() * (maxCols - 1)) + 1;
      const obstacle = { row, col: randomCol };

      obstacles.push(obstacle);
      count++;
    }
  }

  // Generate remaining obstacles randomly on even rows
  while (count < obstacleCount) {
    const randomRow = Math.floor(Math.random() * (maxRows / 2 - 1) + 1) * 2;
    const randomCol = Math.floor(Math.random() * (maxCols - 1)) + 1;

    // Check if an obstacle already exists at this position
    const existingObstacle = obstacles.find(
      (obstacle) => obstacle.row === randomRow && obstacle.col === randomCol
    );

    // If no obstacle exists at this position, add a new obstacle
    if (!existingObstacle) {
      obstacles.push({ row: randomRow, col: randomCol });
      count++;
    }
  }

  return obstacles;
}

const getRandomCol = (maxCols: number) =>
  Math.floor(Math.random() * (maxCols - 1)) + 1;

const getAvalibleMoves = (state : GameState) => {
  let moves : AvailableMoves[] =  [];
  const row = state.animalPosition.row;
  const col = state.animalPosition.col;

// Moving Left
  if (col > 1) {
    moves.push({
      row: row,
      col: col - 1,
      color: state.currentSettings.rowSettings[row - 1].color, //Offset by 1
      shape: state.currentSettings.columnSettings[col - 1].shape,
      movement : moveDirection.Left
    });
  }

  // Moving Right
  if (col < state.maxCols) {
    moves.push({
      row: row,
      col: col + 1,
      color: state.currentSettings.rowSettings[row - 1].color,
      shape: state.currentSettings.columnSettings[col + 1].shape,
      movement : moveDirection.Right
    });
  }

  // Moving Down
  if (row > 2) {
    moves.push({
      row: row - 2,
      col: col,
      color: state.currentSettings.rowSettings[row - 3].color,
      shape: state.currentSettings.columnSettings[col].shape,
      movement : moveDirection.Down
    });
  }

  // Moving Up
  if (row < state.maxRows - 1) {
    moves.push({
      row: row + 2,
      col: col,
      color: state.currentSettings.rowSettings[row + 1].color,
      shape: state.currentSettings.columnSettings[col].shape,
      movement : moveDirection.Up
    });
  }

  return moves;
}

const domTravSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeObstacles: (state) => {
      state.obstacles = Array.from({ length: state.obstacleCount }, () => ({
        row: Math.floor(Math.random() * Math.floor(state.maxRows / 2)) * 2 + 2,
        col: getRandomCol(state.maxCols),
      }));
    },
    moveAnimal: (state, action: PayloadAction<AnimalPosition>) => {
      const { row: targetRow, col: targetCol } = action.payload;
      const { row: currentRow, col: currentCol } = state.animalPosition;

      const verticalMove = targetRow !== currentRow;

      if (verticalMove) {
        const direction = targetRow > currentRow ? 1 : -1;
        const checkRow = currentRow + direction;

        const hitObstacle = state.obstacles.some(
          (obstacle) => obstacle.row === checkRow && obstacle.col === targetCol
        );

        if (hitObstacle) {
          state.errorMessage = "Oops! You hit an obstacle.";
          state.gameplayState = GameplayState.GameOver;
          return;
        }
      }

      // Ensure the new position is within bounds
      const isOutOfBounds = targetCol <= 0 || targetCol >= state.maxCols;
      if (isOutOfBounds || targetRow > state.maxRows || targetRow < 0) {
        state.errorMessage =
          "Invalid move. The animal can only move within the defined bounds.";
        return;
      }

      // Update the animal's position if no obstacles are in the way
      state.animalPosition = { row: targetRow, col: targetCol };
      state.errorMessage = null;
      console.log("Animal moved to row:", targetRow, "col:", targetCol);

      // Check if Animal has reached the final row
      if (targetRow >= state.maxRows) {
        state.gameplayState = GameplayState.Won;
        return;
      }

      //Update Avalible Moves
      state.availableMoves = getAvalibleMoves(state);
    },
    addRow: (state) => {
      if (state.rows.length < 21) {
        const newRows = [
          state.rows.length + 1,
          state.rows.length + 2,
          // state.rows.length + 3,
        ];
        state.rows = [...state.rows, ...newRows];
        state.maxRows += 2;
        state.obstacleCount += 2;
      } else {
        state.errorMessage = "You have reached the maximum number of rows.";
      }
    },
    removeRow: (state) => {
      if (state.rows.length <= 3) {
        state.errorMessage = "You must have at least three rows.";
        return;
      }

      if (state.animalPosition.row > state.maxRows - 3) {
        state.errorMessage = "Cannot remove rows the animal is currently in";
        return;
      }

      state.rows = state.rows.slice(0, -2);
      state.maxRows -= 2;
      state.obstacleCount -= 2;
    },
    addObstacle: (state) => {
      const rowOptions = state.rows.filter(
        (row) => row % 2 === 1 && row > state.animalPosition.row
      );
      const randomRow =
        rowOptions[Math.floor(Math.random() * rowOptions.length)];
      const randomCol = getRandomCol(state.maxCols);

      state.obstacles.push({ row: randomRow, col: randomCol });
      state.obstacleCount++;
    },
    removeObstacle: (state) => {
      const aboveRows = state.obstacles.filter(
        (obstacle) => obstacle.row > state.animalPosition.row
      );

      if (aboveRows.length > 0) {
        const obstacleToRemove =
          aboveRows[Math.floor(Math.random() * aboveRows.length)];
        state.obstacles = state.obstacles.filter(
          (obs) =>
            !(
              obs.row === obstacleToRemove.row &&
              obs.col === obstacleToRemove.col
            )
        );
        state.obstacleCount--;
      }
    },
    clearError: (state) => {
      state.errorMessage = null;
    },
    setMaxRows: (state, action: PayloadAction<number>) => {
      state.maxRows = action.payload;
    },
    setMaxCols: (state, action: PayloadAction<number>) => {
      state.maxCols = action.payload;
    },
    setObstacleAnimation: (_state, _action: PayloadAction<boolean>) => {
      // state.areObstaclesAnimated = action.payload;
    },
    setObstacleCount: (state, action: PayloadAction<number>) => {
      state.obstacleCount = action.payload;
      // const newCount = action.payload;
      // if (newCount < state.obstacleCount) {
      //   const currentRow = state.animalPosition.row;
      //   const allowedRowsAbove = state.rows.filter(
      //     (row) => row > currentRow && row % 2 === 1
      //   );
      //   state.obstacleCount = Math.min(newCount, allowedRowsAbove.length);
      // } else {
      //   state.obstacleCount = newCount;
      // }
    },
    startGame: (state, action: PayloadAction<GameSettings>) => {
      //Handle Logic for Starting the game such as setting rows and spawning objects
      const settings: GameSettings = action.payload;

      const rowCount = 1 + settings.length * 2; // Rows = (One starting row) + (selected LENGTH multiplied by TWO [one additional obstacle row and one safe row])

      state.rows = Array.from({ length: rowCount }, (_, index) => index + 1);
      state.maxRows = rowCount;
      state.animalPosition = initialState.animalPosition; //Reset animal position to starting position
      state.errorMessage = null; //Reset error message in case there some weird overlap
      state.obstacleCount = settings.length * settings.density; // Count = selected LENGTH (AKA 1 obstacle per 2 rows) multiplied by DENSITY [This should generate DENSITY obstacles per row but spread randomly between all obstacle rows]
      state.obstacleSpeed = settings.obstacleSetting;
      state.obstacles = generateObstacles(
        state.maxRows,
        state.maxCols,
        state.obstacleCount
      );
      state.gameplayState = GameplayState.Playing;
      state.currentSettings = settings;
      state.availableMoves = getAvalibleMoves(state);
    },
    exitGame: (state) => {
      state.gameplayState = GameplayState.Settings;
    },
    updateObstacles: (state, action: PayloadAction<Obstacle[]>) => {
      state.obstacles = action.payload;
    },
    setRowSettings: (state, action: PayloadAction<number>) => {
      const numRows = action.payload;
      state.currentSettings.rowSettings = Array.from(
        { length: numRows },
        (_, index) => ({
          row: index + 1,
          color: "test",
        })
      );
    },
    setColumnSettings: (state, action: PayloadAction<number>) => {
      const numCols = action.payload;
      state.currentSettings.columnSettings = Array.from(
        { length: numCols },
        (_, index) => ({
          col: index + 1,
          shape: "test",
        })
      );
    },
  },
});

export const {
  moveAnimal,
  addRow,
  removeRow,
  clearError,
  setObstacleAnimation,
  setObstacleCount,
  addObstacle,
  removeObstacle,
  initializeObstacles,
  startGame,
  exitGame,
  updateObstacles,
} = domTravSlice.actions;
export default domTravSlice.reducer;
