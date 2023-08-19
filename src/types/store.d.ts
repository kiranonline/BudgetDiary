import { TAppConfig } from './appConfigs';
import { TAuthStoreSlice } from './auth';
import { TMyAccountSlice } from './myAccounts';
import { TTransactionCategorySlice } from './transactionCategories';
export interface TGlobalState {
    appAuth?: TAuthStoreSlice;
    appConfig?: TAppConfig;
    myAccounts?: TMyAccountSlice;
    transactionCategories?: TTransactionCategorySlice;
}