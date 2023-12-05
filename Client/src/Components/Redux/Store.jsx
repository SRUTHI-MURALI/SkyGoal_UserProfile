/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "../Redux/UserSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
  },
});
