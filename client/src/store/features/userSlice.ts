import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData, updateUserData } from "../../apis/user";
import type { User } from "../../apis/userApi";

// Define types
interface UserState {
  userData: User | null;
  loading: boolean;
  error: string | null;
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  updateError: string | null;
}

// Initial state
const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
  updateStatus: "idle",
  updateError: null,
};

// Async thunks
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const userData = await fetchUserData(userId);
      if (!userData) {
        throw new Error("Failed to fetch user data");
      }
      return userData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch user data");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    { userId, userData }: { userId: string; userData: Partial<User> },
    { rejectWithValue }
  ) => {
    try {
      const updatedUser = await updateUserData(userId, userData);
      if (!updatedUser) {
        throw new Error("Failed to update user data");
      }
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update user data");
    }
  }
);

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = null;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update user
    builder.addCase(updateUser.pending, (state) => {
      state.updateStatus = "loading";
      state.updateError = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.updateStatus = "succeeded";
      state.updateError = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.updateStatus = "failed";
      state.updateError = action.payload as string;
    });
  },
});

export const { clearUserData, resetUpdateStatus } = userSlice.actions;
export default userSlice.reducer;
