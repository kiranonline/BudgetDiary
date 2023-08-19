export enum MY_ACCOUNT_CASH_FLOW_DIRECTION {
    POSITIVE = "POSITIVE",
    NEGATIVE = 'NEGATIVE'
}

export enum MY_ACCOUNT_CATEGORY_QUALITY_NAME {
    ASSET = 'ASSET',
    LIABILITY = 'LIABILITY'
}

export enum MY_ACCOUNT_CATEGORY_NAME {
    CASH = 'CASH',
    SAVINGS = 'SAVINGS',
    CREDIT_CARD = 'CREDIT_CARD',
    INVESTMENTS = 'INVESTMENTS',
    LOAN = 'LOAN',
    INSURANCE = 'INSURANCE'
}
export enum TRANSACTION_TYPE_NAME {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
    TRANSFER = 'TRANSFER',
    INVEST = 'INVEST'
}

export interface TMyAccountCategrory {
    id: string;
    name: MY_ACCOUNT_CATEGORY_NAME;
    displayName: string;
    quality: MY_ACCOUNT_CATEGORY_QUALITY_NAME;
    icon: string;
}

export enum TRANSACTION_CATEGORY_TYPE_NAME {
    ROOT_CATEGORY = 'ROOT_CATEGORY',
    SUB_CATEGORY = 'SUB_CATEGORY'
}

export interface TTransactionCategrory {
    id: string;
    name: string;
    group: TRANSACTION_TYPE_NAME.INCOME | TRANSACTION_TYPE_NAME.EXPENSE;
    type: TRANSACTION_CATEGORY_TYPE_NAME;
    rootCategoryId?: string;
    subCategories?: TMyTransactionCategrory[]
}