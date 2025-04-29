import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "inputEmail",
  initialState: {
    email: "",
  },
  reducers: {
    setInputEmail: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setInputEmail } = emailSlice.actions;
export default emailSlice.reducer;
