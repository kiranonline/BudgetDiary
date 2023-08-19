import { MY_ACCOUNT_CATEGORY_NAME, TMyAccountCategrory } from "@app/types";

import { staticAccountCategories } from './const';

export class AccountCategoryBuilder {
    data: TMyAccountCategrory[] = staticAccountCategories;

    constructor() {

    }

    getAccountTypeById(id: string) {
        return this.data?.find?.((payload) => payload.id === id)
    }

    getAccountTypeByName(name: MY_ACCOUNT_CATEGORY_NAME) {
        return this.data?.find?.((payload) => payload.name === name)
    }

    getAllAccountTypes() {
        return this.data
    }
}