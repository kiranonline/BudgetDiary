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
                    ...action?.payload,
                    id: nanoid(),
                }]
            }
            return state
        },
        updateMyAccount(state, action: PayloadAction<TMyAccount>) {
            state = {
                ...state,
                myAccounts: state.myAccounts.map(myAccount => (myAccount.id === action.payload.id) ? action?.payload : myAccount)
            }
            return state
        },
        deleteMyAccount(state, action: PayloadAction<string>) {
            state = {
                ...state,
                myAccounts: state?.myAccounts?.filter?.(myAccount => myAccount?.id !== action.payload)
            }
            return state
        }
    },
})

export default MyAccountsSlice.reducer;
export const { createNewMyAccount, deleteMyAccount, updateMyAccount } = MyAccountsSlice.actions;