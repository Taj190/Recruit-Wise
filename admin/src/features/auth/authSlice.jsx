import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
    'auth/login', 
    async (userCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userCredentials, {
                withCredentials: true, 
            });
            return response.data;  
        } catch (error) {
            // Ensure to check if error.response is available
            return rejectWithValue(error.response?.data?.error || 'Login failed.'); // Default message
        }
    }
);

// Async thunk for checking authentication
export const checkAuth = createAsyncThunk(
    'auth/checkAuth', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/auth/me`, {
                withCredentials: true,
            });
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Authentication check failed.'); // Default message
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/auth/logout`, {
                withCredentials: true, 
            });
            // If your API sends any response back on logout, you can process it here
            return response.data; // Optionally return some data
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Logout failed.'); // Default message
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoggedIn: false,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'success';
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(checkAuth.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.status = 'success';
            })
            .addCase(checkAuth.rejected, (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.status = 'failed';
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;  
                state.isLoggedIn = false;
                state.status = 'success';
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;
