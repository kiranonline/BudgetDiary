import { TMyAccount, TMyAccountSlice } from '@app/types';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    myAccounts: [],
    isMyAccountsFetching: false
} as TMyAccountSlice;

const MyAccountsSlice = createSlice({
    name: 'myAccounts',
    initialState: initialState,
    reducers: {
        createNewMyAccount(state, action: PayloadAction<Omit<TMyAccount, 'id'>>) {
            state = {
                ...state,
                myAccounts: [...state.myAccounts, {
                    id: nanoid(),
                    ...action?.payload
                }]
            }
            return state
        }
    },
})

export default MyAccountsSlice.reducer;
export const { createNewMyAccount } = MyAccountsSlice.actions;