import {IAuthState, IRegisterModel} from "../../types/types.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRegister } from "../../api/registerAPI.ts";

const initialState: IAuthState = {
    accessToken: null,
    isAuthenticated: false,
    username: null,
    loading: false,
    error: null,
}

export const registerRequest = createAsyncThunk(
    'auth/register',
    async (registerModel: IRegisterModel): Promise<number> => {
        return await fetchRegister(registerModel);
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerRequest.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                console.log("Ответ от сервера:", action.payload)
            })

            .addCase(registerRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
    }
})

export default authSlice.reducer;