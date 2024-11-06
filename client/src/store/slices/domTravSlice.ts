import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnimalPosition {
  row: number;
  col: number;
}
interface Obstacle {
  row: number;
  col: number;
}
interface GameState {
  rows: number[];
  animalPosition: AnimalPosition;
  errorMessage: string | null;
  maxRows: number;
  maxCols: number;
  obstacleCount: number;
  areObstaclesAnimated: boolean;
  obstacles: Obstacle[];
}

const initialState: GameState = {
  rows: [1, 2, 3],
  animalPosition: { row: 1, col: 5 },
  errorMessage: null,
  maxRows: 3,
  maxCols: 12,
  obstacleCount: 3,
  areObstaclesAnimated: false,
  obstacles: [],
};

const getRandomCol = (maxCols: number) =>
  Math.floor(Math.random() * (maxCols - 1)) + 1;

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
      const { row, col } = action.payload;
      const isInvalidRow = row % 2 == 0 || row > state.maxRows || row < 0;
      const isOutOfBounds = col <= 0 || col >= state.maxCols;
      console.log(state.maxRows);

      if (!isInvalidRow && !isOutOfBounds) {
        state.animalPosition = action.payload;
        state.errorMessage = null;
        console.log("Animal moved to row:", row, "col:", col);
      } else {
        state.errorMessage =
          "Invalid move. The animal can only move to even rows within the defined column limits.";
      }
    },
    addRow: (state) => {
      if (state.rows.length < 21) {
        const newRows = [
          state.rows.length + 1,
          state.rows.length + 2,
          state.rows.length + 3,
        ];
        state.rows = [...state.rows, ...newRows];
        state.maxRows += 3;
        state.obstacleCount += 3;
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

      state.rows = state.rows.slice(0, -3);
      state.maxRows -= 3;
      state.obstacleCount -= 3;
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
    setObstacleAnimation: (state, action: PayloadAction<boolean>) => {
      state.areObstaclesAnimated = action.payload;
    },
    setObstacleCount: (state, action: PayloadAction<number>) => {
      const newCount = action.payload;
      if (newCount < state.obstacleCount) {
        const currentRow = state.animalPosition.row;
        const allowedRowsAbove = state.rows.filter(
          (row) => row > currentRow && row % 2 === 1
        );
        state.obstacleCount = Math.min(newCount, allowedRowsAbove.length);
      } else {
        state.obstacleCount = newCount;
      }
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
} = domTravSlice.actions;
export default domTravSlice.reducer;
