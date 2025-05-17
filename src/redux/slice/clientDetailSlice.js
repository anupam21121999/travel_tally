import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    selectedClient: null,
  },
  reducers: {
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
  },
});

export const { setSelectedClient } = clientSlice.actions;
export default clientSlice.reducer;
