import { AppThemeStoreSlice } from '@app/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {} as AppThemeStoreSlice;

const ThemeSlice = createSlice({
    name: 'appTheme',
    initialState: initialState,
    reducers: {
        setAppTheme(state, action: PayloadAction<AppThemeStoreSlice>) {
            return action.payload;
        },
    },
})

export default ThemeSlice.reducer;
export const { setAppTheme } = ThemeSlice.actions;