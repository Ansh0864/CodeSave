import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./redux/pasteSlice";  // ✅ adjust path

const store = configureStore({
  reducer: {
    pastes: pasteReducer,
  },
});

export default store;
