import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platformName: "PostHub",
  theme: "light",
  notificationsEnabled: true,
  activeCategory: "All"
};

const platformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleNotifications(state) {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    }
  }
});

export const { toggleTheme, toggleNotifications, setActiveCategory } = platformSlice.actions;
export default platformSlice.reducer;
