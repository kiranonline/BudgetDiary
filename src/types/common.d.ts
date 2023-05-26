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

export interface TMyAccountCategrory {
    id: string;
    name: MY_ACCOUNT_CATEGORY_NAME;
    displayName: string;
    quality: MY_ACCOUNT_CATEGORY_QUALITY_NAME;
    icon: string;
}