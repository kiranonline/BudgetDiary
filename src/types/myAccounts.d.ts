import { TMyAccountCategrory } from './common.d';

export interface TMyAccount {
    id: string;
    accountType: TMyAccountCategrory;
    amount: number;
    name: string;
}

export interface TMyAccountSlice {
    myAccounts: TMyAccount[],
    isMyAccountsFetching: boolean
}