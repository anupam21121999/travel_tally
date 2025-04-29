import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "../slice/emailSlice";
import userSlice from "../slice/userSlice";

export const store = configureStore({
  reducer: {
    inputEmail: emailSlice,
    user: userSlice,
  },
});
