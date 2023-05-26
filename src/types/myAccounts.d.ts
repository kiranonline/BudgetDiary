import { TMyAccountCategrory } from './common.d';

export interface TMyAccount {
    id: string;
    accountCategory: TMyAccountCategrory;
    amount: number;
    name: string;
}

export interface TMyAccountSlice {
    myAccounts: TMyAccount[],
    isMyAccountsFetching: boolean
}