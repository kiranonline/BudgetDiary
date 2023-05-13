import { User, AuthStoreSlice } from '@app/types';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
} as AuthStoreSlice;

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
        login(state, action: PayloadAction<Partial<AuthStoreSlice>>) {
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