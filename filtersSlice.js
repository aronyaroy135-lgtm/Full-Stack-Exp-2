import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { search: "", category: "All", sortBy: "title", likedOnly: false },
  reducers: {
    setSearch(state, action) { state.search = action.payload; },
    setCategory(state, action) { state.category = action.payload; },
    setSortBy(state, action) { state.sortBy = action.payload; },
    setLikedOnly(state, action) { state.likedOnly = action.payload; },
    resetFilters() { return { search: "", category: "All", sortBy: "title", likedOnly: false }; }
  }
});

export const { setSearch, setCategory, setSortBy, setLikedOnly, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
