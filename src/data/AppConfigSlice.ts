import { TAppConfig } from '@app/types';
import { createSlice } from '@reduxjs/toolkit';
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const initialState = {
    appTheme: {
        name: 'Default',
        vars: DefaultTheme
    }
} as TAppConfig;

const AppConfigSlice = createSlice({
    name: 'appConfig',
    initialState: initialState,
    reducers: {

    },
})

export default AppConfigSlice.reducer;