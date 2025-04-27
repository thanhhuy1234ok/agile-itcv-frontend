import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../services/api";

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("access_token") || null,
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
    },
    clearError: (state) => {
      state.error = null;
    },
    onLogin: (state, action) => {
      state.user = action.payload.response.data;
      state.accessToken = action.payload.response.access_Token;

      // Save to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.response.data)
      );
      localStorage.setItem(
        "access_token",
        action.payload.response.access_Token
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.accessToken = action.payload.access_Token;

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("access_token", action.payload.access_Token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        // Note: Your backend might not return a token on register
        // If it does, uncomment the line below
        // state.accessToken = action.payload.access_Token

        // Save to localStorage if needed
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        // localStorage.setItem("access_token", action.payload.access_Token)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logout, clearError, onLogin } = authSlice.actions;
export default authSlice.reducer;
