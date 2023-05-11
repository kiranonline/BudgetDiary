import {
    FC,
    useMemo,
    Dispatch,
    useReducer,
    useContext,
    createContext
} from 'react';
import reducer from './reducer';
import { ActionObject, Store } from '@localTypes';

export interface Props {
    children: JSX.Element;
}

export interface StoreProvider {
    state: Store;
    dispatch: Dispatch<ActionObject>;
}

const initialStore: Store = {};

const StoreContext = createContext<StoreProvider>({
    state: initialStore,
    dispatch: (action: ActionObject) => null
});

export const StoreProvider: FC<Props> = (props: Props): JSX.Element => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialStore);
    const [memorisedState, memorisedDispatch] = useMemo(
        () => [state, dispatch],
        [state]
    );

    return (
        <StoreContext.Provider
            value={{ state: memorisedState, dispatch: memorisedDispatch }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const { dispatch, state } = useContext(StoreContext);
    return { dispatch, state };
};
