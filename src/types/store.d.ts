import { TAppConfig } from './appConfigs';
import { TAuthStoreSlice } from './auth';
import { TMyAccountSlice } from './myAccounts';

export interface TGlobalState {
    appAuth?: TAuthStoreSlice;
    appConfig?: TAppConfig,
    myAccounts?: TMyAccountSlice;
}