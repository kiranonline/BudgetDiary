import { AuthStoreSlice } from './auth';
import { AppThemeStoreSlice } from "./theme";

export interface GlobalState {
    appAuth?: AuthStoreSlice;
    appTheme?: AppThemeStoreSlice;
}