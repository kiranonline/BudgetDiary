import { MY_ACCOUNT_CATEGORY_NAME, MY_ACCOUNT_CATEGORY_QUALITY_NAME, TMyAccountCategrory } from "@app/types";

export const staticAccountCategories: TMyAccountCategrory[] = [
    {
        id: 'e63e5751-956c-4fb0-86f8-3c5d577d7307',
        name: MY_ACCOUNT_CATEGORY_NAME.CASH,
        quality: MY_ACCOUNT_CATEGORY_QUALITY_NAME.ASSET,
        displayName: 'Cash',
        icon: 'cash'
    },
    {
        id: 'de6ae5b2-e46f-49eb-bda3-5365a67b6847',
        name: MY_ACCOUNT_CATEGORY_NAME.SAVINGS,
        quality: MY_ACCOUNT_CATEGORY_QUALITY_NAME.ASSET,
        displayName: 'Savings Account',
        icon: 'bank'
    },
    {
        id: '9a79786e-6ecd-4c1e-808e-0d5ab7aff04a',
        name: MY_ACCOUNT_CATEGORY_NAME.CREDIT_CARD,
        quality: MY_ACCOUNT_CATEGORY_QUALITY_NAME.LIABILITY,
        displayName: 'Credit Card',
        icon: 'credit-card'
    },
    {
        id: 'dd24c087-fecd-4dc7-9f23-3d1c16c50cbe',
        name: MY_ACCOUNT_CATEGORY_NAME.INVESTMENTS,
        quality: MY_ACCOUNT_CATEGORY_QUALITY_NAME.ASSET,
        displayName: 'Investments',
        icon: 'piggy-bank'
    },
    {
        id: '7c15a0b5-477b-47d4-9174-c444ab443f90',
        name: MY_ACCOUNT_CATEGORY_NAME.LOAN,
        quality: MY_ACCOUNT_CATEGORY_QUALITY_NAME.LIABILITY,
        displayName: 'Loan/Emi',
        icon: 'emoticon-sad'
    },
    {
        id: '429729ab-748e-43ac-84f8-0dcc3e422ee5',
        name: MY_ACCOUNT_CATEGORY_NAME.INSURANCE,
        quality: MY_ACCOUNT_CATEGORY_QUALITY_NAME.LIABILITY,
        displayName: 'Insurance',
        icon: 'clipboard-pulse-outline'
    }
]