import { debounce } from 'lodash';
import logger from 'redux-logger';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { batchedSubscribe } from 'redux-batched-subscribe';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthReducers from './AuthSlice';
import ThemeReducer from './ThemeSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['appAuth']
}

const rootReducer = combineReducers({
    appTheme: ThemeReducer,
    appAuth: AuthReducers
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