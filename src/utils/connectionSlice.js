import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    addSingleConnection: (state, action) => {
      return state.push(action.payload);
    },
    removeConnections: (state, action) => [],
  },
});

export const { addConnections, addSingleConnection, removeConnections } =
  connectionSlice.actions;
export default connectionSlice.reducer;
