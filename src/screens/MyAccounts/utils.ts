import { TMyAccount, TMyAccountCategrory } from "@app/types";
import { forOwn, isArray } from "lodash";

export const arrangeAccountsByCategory = (accounts: TMyAccount[] = [], allowedCategories: TMyAccountCategrory[] = [], sortOrder = 1) => {
    const outputMap: Record<string, TMyAccount[]> = {};
    let output: TMyAccount[] = []
    const allowedCategoryIds = allowedCategories?.map(allowedCategory => allowedCategory?.id)
    accounts.forEach((account) => {
        if (allowedCategoryIds?.includes(account?.accountCategory?.id)) {
            if (isArray(outputMap[account?.accountCategory?.id])) outputMap[account?.accountCategory?.id].push(account)
            else outputMap[account?.accountCategory?.id] = [account]
        }
    })
    forOwn(outputMap, (value: TMyAccount[], key: string) => {
        output = output.concat(outputMap[key].sort((element1: TMyAccount, element2: TMyAccount) => {
            const amount1 = Number(element1?.amount)
            const amount2 = Number(element2.amount);
            return sortOrder === 1 ? amount1 - amount2 : amount2 - amount1
        }))
    })
    return output;
}