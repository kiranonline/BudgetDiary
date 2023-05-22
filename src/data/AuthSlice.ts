import { TAuthStoreSlice } from '@app/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
} as TAuthStoreSlice;

const AuthSlice = createSlice({
    name: 'appAuth',
    initialState: initialState,
    reducers: {
        logout(state) {
            state = {
                ...state,
                isLoggedIn: false,
                token: null,
                user: undefined
            }
            return state;
        },
        login(state, action: PayloadAction<Partial<TAuthStoreSlice>>) {
            state = {
                ...state,
                ...action?.payload,
                isLoggedIn: true
            }
            return state
        }
    },
})

export default AuthSlice.reducer;
export const { logout, login } = AuthSlice.actions;