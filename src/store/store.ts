import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from '../features/apiSlice';
import cartReducer from '../features/cartSlice';
import userReducer from '../features/userSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'], // Whitelist slices to persist
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific paths of non-serializable values if necessary
        ignoredActions: ['persist/PERSIST'], // Example: ignore actions from redux-persist
        ignoredPaths: ['persist.persistentStorage'], // Example: ignore specific paths
      },
    }).concat(apiSlice.middleware),
});

// Create persistor
export const persistor = persistStore(store);

// Define types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
