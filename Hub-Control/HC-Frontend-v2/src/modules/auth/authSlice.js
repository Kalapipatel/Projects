import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// --- Async Thunk: Handles the Login API Call ---
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, roleId }, { rejectWithValue }) => {
    try {
      // 1. Send Login Request
      const response = await api.post('/auth/login', { 
        email, 
        password, 
        roleId 
      });
      
      const data = response.data;

      // 2. Validate Token Existence (Logic from old code)
      if (!data.jwtToken) {
        return rejectWithValue('Login successful but no token received.');
      }

      return data; // Payload for the 'fulfilled' case

    } catch (err) {
      // --- Error Logic (Strictly from Previous Working Code) ---
      let errorMsg = "Login failed. Please try again.";

      if (err.response) {
        const status = err.response.status;
        
        // Logic Requirement 1: Check Credentials
        if (status === 401) {
           errorMsg = "Your credentials are not valid.";
        } 
        // Logic Requirement 2: Check Role
        else if (status === 403) {
           // We can't access 'role' string here easily without passing it, 
           // but we can give a clear generic message or pass the role name in the thunk arg if needed.
           errorMsg = "Your role is not correct. You do not have permission to login with this role.";
        } 
        // Other Server Errors
        else {
           const backendMsg = err.response.data?.message || err.response.data;
           errorMsg = typeof backendMsg === 'string' ? backendMsg : `Server Error (${status})`;
        }
      } else if (err.request) {
        errorMsg = "Cannot connect to server. Is Spring Boot running?";
      }

      return rejectWithValue(errorMsg);
    }
  }
);

// --- Initial State (Restores session from LocalStorage) ---
const initialState = {
  user: localStorage.getItem('username') || null,
  userId: localStorage.getItem('userId') || null,
  token: localStorage.getItem('jwtToken') || null,
  roleId: localStorage.getItem('roleId') || null,
  redirectPage: localStorage.getItem('targetPage') || null, // Important for navigation
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Manual logout action
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
      state.roleId = null;
      state.redirectPage = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Clear persistence
      localStorage.clear();
    },
    // Clear errors (useful when user starts typing again)
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 1. Login Pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 2. Login Success
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        
        // Update State
        state.token = action.payload.jwtToken;
        state.userId = action.payload.userId;
        state.user = action.payload.username;
        state.roleId = action.payload.roleId;
        state.redirectPage = action.payload.redirectPage;

        // Persist to LocalStorage (Matching old code keys)
        localStorage.setItem('jwtToken', action.payload.jwtToken);
        localStorage.setItem('userId', action.payload.userId);
        localStorage.setItem('username', action.payload.username);
        localStorage.setItem('roleId', action.payload.roleId);
        localStorage.setItem('isActive', action.payload.isActive);
        localStorage.setItem('targetPage', action.payload.redirectPage);
      })
      // 3. Login Failed
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // This contains our custom errorMsg
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;