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
  // adjusted to row 1 for label matching
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
      // added OR row < 0 to enable error message when traveling too far left
      // removed the !== from row divisibility to prevent movement error with new row labeling method
      const isInvalidRow = row % 2 == 0 || row > state.maxRows || row < 0; 
      const isOutOfBounds = col <= 0 || col >= state.maxCols;

      // moveright is properly preventing movements out of bounds and throwing error
      // movedown is properly preventing movements out of bounds and throwing error
      // TODO-
      // moveup is stopping movement but not throwing error
      // moveleft is only throwing error after 0 because of index - demonstrate for the crazy people

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
          state.rows[0] + 3,
          state.rows[0] + 2,
          state.rows[0] + 1,
        ];
        state.rows = [...newRows, ...state.rows];
      } else {
        state.errorMessage = "You have reached the maximum number of rows.";
      }
    },
    removeRow: (state) => {
      if (state.rows.length > 3) {
        state.rows = state.rows.slice(3);
      } else {
        state.errorMessage = "You must have at least three rows.";
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
  },
});

export const { moveAnimal, addRow, removeRow, clearError } =
  domTravSlice.actions;
export default domTravSlice.reducer;
