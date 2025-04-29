import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobile: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPhone(state, action) {
      state.mobile = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setPhone, setToken } = userSlice.actions;
export default userSlice.reducer;
