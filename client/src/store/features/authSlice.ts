import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
  } from "@reduxjs/toolkit";
  import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    type User as FirebaseUser,
  } from "firebase/auth";
  import { auth } from "../../config/firebase";
  
  // Define types
  interface AuthState {
    user: FirebaseUser | null;
    loading: boolean;
    error: string | null;
  }
  
  interface LoginCredentials {
    email: string;
    password: string;
  }
  
  interface RegisterCredentials extends LoginCredentials {
    displayName?: string;
  }
  
  // Initial state
  const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
  };
  
  // Async thunks
  export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredential.user;
      } catch (error: any) {
        return rejectWithValue(error.message || "Login failed");
      }
    }
  );
  
  export const register = createAsyncThunk(
    "auth/register",
    async (
      { email, password, displayName }: RegisterCredentials,
      { rejectWithValue }
    ) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // You can update the user profile here if needed
        return userCredential.user;
      } catch (error: any) {
        return rejectWithValue(error.message || "Registration failed");
      }
    }
  );
  
  export const signOut = createAsyncThunk(
    "auth/signOut",
    async (_, { rejectWithValue }) => {
      try {
        await firebaseSignOut(auth);
        return null;
      } catch (error: any) {
        return rejectWithValue(error.message || "Sign out failed");
      }
    }
  );
  
  // Create slice
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<FirebaseUser | null>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      },
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      // Login
      builder.addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      });
      builder.addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  
      // Register
      builder.addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      });
      builder.addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  
      // Sign out
      builder.addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
      builder.addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    },
  });
  
  export const { setUser, clearError } = authSlice.actions;
  export default authSlice.reducer;
  