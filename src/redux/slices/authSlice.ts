import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../../services/api/authApi';




const initialState = {
    user: null,
    token: null as string | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null
}

export const loginAction = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
    try {
        const data = await login(email, password);
        return data;
    } catch (error) {
        throw error;
    }
});

export const registerAction = createAsyncThunk('auth/register', async ({ name, email, password }: { name: string; email: string; password: string }) => {
    try {
        const data = await register(name, email, password);
        return data;
    } catch (error) {
        throw error;
    }
});

 export const loaduserFromLocalStorage = createAsyncThunk('auth/loadUserFromLocalStorage', () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    const isAuthenticated = token !== null && token !== undefined && token !== '';
    return { user, token, isAuthenticated };
});



const authSlice = createSlice({
  name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload as string | null;
        },
    },
    extraReducers: (builder) => {   
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                state.isAuthenticated = true;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            })
            .addCase(registerAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAction.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            })
            .addCase(loaduserFromLocalStorage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loaduserFromLocalStorage.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = action.payload.isAuthenticated;
            }
            )
            .addCase(loaduserFromLocalStorage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            }
        )
    }
});
export const { setUser, setToken, setIsAuthenticated, setLoading, setError } = authSlice.actions;
export const authReducer = authSlice.reducer;
