export * from './const';
import { MY_ACCOUNT_CATEGORY_NAME, TMyAccountCategrory } from "@app/types";
import { staticAccountTypes } from './const';

export class AccountTypeBuilder {
    data: TMyAccountCategrory[] = staticAccountTypes;

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