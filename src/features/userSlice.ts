// src/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;  // Store only the access token initially
}

const initialState: UserState = {
  token: null,  // Initialize with no token
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set token when the user logs in
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // Clear token when logging out
    clearToken: (state) => {
      state.token = null;
    },
  },
});

// Export the actions
export const { setToken, clearToken } = userSlice.actions;

// Export the reducer as default
export default userSlice.reducer;
