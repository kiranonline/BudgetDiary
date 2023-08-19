import { TTransactionCategrory } from './common';

export interface TTransactionCategorySlice {
    transactionCategories: TTransactionCategrory[],
    isTransactioncategoriesFetching: boolean
}