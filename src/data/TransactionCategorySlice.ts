import { TRANSACTION_CATEGORY_TYPE_NAME, TTransactionCategorySlice, TTransactionCategrory } from '@app/types';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';

const initialState = {
    transactionCategories: [],
    isTransactioncategoriesFetching: false
} as TTransactionCategorySlice;

const TransactionCategoriesSlice = createSlice({
    name: 'transactionCategories',
    initialState: initialState,
    reducers: {
        createTransactionCategory(state, action: PayloadAction<Omit<TTransactionCategrory, 'id' | 'subCategories'>>) {
            state = cloneDeep(state);
            if (action.payload.type === TRANSACTION_CATEGORY_TYPE_NAME.ROOT_CATEGORY) {
                state = {
                    ...state,
                    transactionCategories: [...state.transactionCategories, {
                        ...action?.payload,
                        id: nanoid(),
                        rootCategoryId: undefined,
                        subCategories: [],
                        type: TRANSACTION_CATEGORY_TYPE_NAME.ROOT_CATEGORY
                    }]
                }
            }
            else if (action.payload.type === TRANSACTION_CATEGORY_TYPE_NAME.SUB_CATEGORY) {
                state = {
                    ...state,
                    transactionCategories: state.transactionCategories?.map?.((tCategory) => {
                        if (tCategory.id === action.payload.rootCategoryId) {
                            tCategory.subCategories = [...(tCategory.subCategories || []), {
                                ...action?.payload,
                                id: nanoid(),
                                rootCategoryId: action.payload.rootCategoryId,
                                type: TRANSACTION_CATEGORY_TYPE_NAME.SUB_CATEGORY
                            }]
                        }
                        return tCategory
                    })
                }
            }
            return state;
        },
        updateTransactionCategory(state, action: PayloadAction<Omit<TTransactionCategrory, 'subCategories'>>) {
            state = cloneDeep(state);
            if (action.payload.type === TRANSACTION_CATEGORY_TYPE_NAME.ROOT_CATEGORY) {
                state = {
                    ...state,
                    transactionCategories: state.transactionCategories.map(tCategory => {
                        if (tCategory.id === action.payload.id) {
                            tCategory = {
                                ...tCategory,
                                name: action.payload.name
                            }
                        }
                        return tCategory
                    })
                }

            }
            else if (action.payload.type === TRANSACTION_CATEGORY_TYPE_NAME.SUB_CATEGORY) {
                state = {
                    ...state,
                    transactionCategories: state.transactionCategories?.map?.((tCategory) => {
                        if (tCategory.id === action.payload.rootCategoryId) {
                            tCategory.subCategories = (tCategory.subCategories || []).map(tSubcategory => {
                                if (tSubcategory.id === action.payload.id) {
                                    tSubcategory.name = action.payload.name
                                }
                                return tSubcategory
                            })
                        }
                        return tCategory
                    })
                }
            }
            return state
        },
        deleteTransactionCategory(state, action: PayloadAction<TTransactionCategrory>) {
            state = cloneDeep(state);
            if (action.payload.type === TRANSACTION_CATEGORY_TYPE_NAME.ROOT_CATEGORY) {
                state = {
                    ...state,
                    transactionCategories: state.transactionCategories.filter(tCategory => tCategory.id !== action.payload.id)
                }
            }
            else if (action.payload.type === TRANSACTION_CATEGORY_TYPE_NAME.SUB_CATEGORY) {
                state = {
                    ...state,
                    transactionCategories: state.transactionCategories.map(tCategory => {
                        if (tCategory.id === action.payload.rootCategoryId) {
                            tCategory.subCategories = (tCategory.subCategories || [])?.filter(tSubCategory => tSubCategory.id !== action.payload.id)
                        }
                        return tCategory
                    })
                }
            }
            return state
        }
    },
})

export default TransactionCategoriesSlice.reducer;
export const { createTransactionCategory, updateTransactionCategory, deleteTransactionCategory } = TransactionCategoriesSlice.actions;