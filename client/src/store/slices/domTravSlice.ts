import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnimalPosition {
  row: number;
  col: number;
}

interface GameState {
  rows: number[];
  animalPosition: AnimalPosition;
  errorMessage: string | null;
  maxRows: number;
  maxCols: number;
}

const initialState: GameState = {
  rows: [1, 2, 3],
  animalPosition: { row: 1, col: 5 },
  errorMessage: null,
  maxRows: 3,
  maxCols: 12,
};

const domTravSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
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
  },
});

export const { moveAnimal, addRow, removeRow, clearError } =
  domTravSlice.actions;
export default domTravSlice.reducer;
