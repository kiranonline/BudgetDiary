import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { debounce } from 'lodash';
import { batchedSubscribe } from 'redux-batched-subscribe';
import logger from 'redux-logger';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';

import AppConfigReducer from './AppConfigSlice';
import AuthReducers from './AuthSlice';
import MyAccountsReducer from './MyAccountsSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['appAuth', 'myAccounts', 'appConfig']
}

const rootReducer = combineReducers({
    appAuth: AuthReducers,
    appConfig: AppConfigReducer,
    myAccounts: MyAccountsReducer
})

const debounceNotify = debounce((notify: () => any) => notify());
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(logger),
    enhancers: [batchedSubscribe(debounceNotify)],
})

export const persistor = persistStore(store)