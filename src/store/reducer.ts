import { ACTIONS, ActionObject, Store } from '@localTypes';

export const reducer = (initialState: Store, action: ActionObject): Store => {
    switch (action.type) {
        case ACTIONS.SET_APP_THEME:
            return {
                ...initialState,
                appTheme: action.payload
            }
        default:
            return { ...initialState };
    }
};

export default reducer;
