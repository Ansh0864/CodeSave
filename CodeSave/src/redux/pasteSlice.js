import { createSlice } from "@reduxjs/toolkit";

const pasteSlice = createSlice({
  name: "pastes",
  initialState: [],
  reducers: {
    addPaste: (state, action) => {
      state.push(action.payload);
    },
    deletePaste: (state, action) => {
      return state.filter((paste) => paste.id !== action.payload);
    },
  },
});

export const { addPaste, deletePaste } = pasteSlice.actions;
export default pasteSlice.reducer;   // ✅ must export reducer
