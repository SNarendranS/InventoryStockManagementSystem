import { createSlice  } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"

interface User {
  userid: string;
  email: string;
  role: string;
}

interface UserTokenState {
  token: string | null;
  user: User | null;
}

const initialState: UserTokenState = {
  token: null,
  user: null,
};

const userTokenSlice = createSlice({
  name: "userToken",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, clearToken } = userTokenSlice.actions;
export default userTokenSlice.reducer;
