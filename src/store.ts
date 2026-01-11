import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reduxStore';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch } from 'react-redux';
import type { RootState } from './types';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: []
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			}
		}),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);