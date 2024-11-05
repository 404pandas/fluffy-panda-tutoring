import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnimalPosition {
  row: number;
  col: number;
}

interface GameState {
  rows: number[];
  animalPosition: AnimalPosition;
  errorMessage: string | null;
}

const initialState: GameState = {
  rows: [1, 2, 3],
  animalPosition: { row: 0, col: 5 },
  errorMessage: null,
};

const domTravSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveAnimal: (state, action: PayloadAction<AnimalPosition>) => {
      const { row, col } = action.payload;
      if ([0, 3, 6, 9, 12, 15, 18, 21].includes(row) && col >= 0 && col < 12) {
        state.animalPosition = action.payload;
        state.errorMessage = null;
        console.log("Animal moved to row:", row, "col:", col);
      } else {
        state.errorMessage =
          "Invalid move. Animal can only move to valid rows (0, 3, 6, etc.) and within column limits.";
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
  },
});

export const { moveAnimal, addRow, removeRow, clearError } =
  domTravSlice.actions;
export default domTravSlice.reducer;
