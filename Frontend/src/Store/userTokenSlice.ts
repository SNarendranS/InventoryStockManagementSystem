import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserTokenState {
  token: string | null;
}

const initialState: UserTokenState = {
  token: null,
};

const userTokenSlice = createSlice({
  name: 'userToken',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = userTokenSlice.actions;
export default userTokenSlice.reducer;
