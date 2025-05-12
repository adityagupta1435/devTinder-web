import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newArray = state.filter((item) => !(item._id === action.payload));
      return newArray;
    },
    removeAllFeed: (state, action) => null,
  },
});

export const { addFeed, removeAllFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
