import {IAuthState, ILoginModel, IRegisterModel, IUserModel} from "../../../types/types.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {fetchLogin, fetchLogout, fetchRegister, fetchUserInfo} from "../../../api/authAPI.ts";

const initialState: IAuthState = {
    isAuthenticated: false,
    username: null,
    email: null,
    role_name: null,
    loading: false,
    error: null,
}

export const registerRequest = createAsyncThunk(
    'auth/register',
    async (registerModel: IRegisterModel): Promise<number> => {
        return await fetchRegister(registerModel);
    }
)

export const loginRequest = createAsyncThunk(
    'auth/login',
    async (loginModel: ILoginModel) => {
        return await fetchLogin(loginModel)
    }
)

export const userInfoRequest = createAsyncThunk(
    'auth/user',
    async () => {
        return await fetchUserInfo();
    }
)

export const userLogoutRequest = createAsyncThunk(
    'auth/logout',
    async () => {
        return await fetchLogout();
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser(state) {
            state.isAuthenticated = false;
            state.username = null;
            state.email = null;
            state.role_name = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerRequest.fulfilled, (state) => {
                state.loading = false;
            })

            .addCase(registerRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })

            .addCase(loginRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginRequest.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })

            .addCase(loginRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.code || 'Something went wrong';
            })

            .addCase(userInfoRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(userInfoRequest.fulfilled, (state, action: PayloadAction<IUserModel>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.role_name = action.payload.role_name;
            })

            .addCase(userInfoRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.code || 'Something went wrong';
            })
    }
})

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;