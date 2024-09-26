import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from '../features/apiSlice';
import cartReducer from '../features/cartSlice';
import userReducer from '../features/userSlice'; // Ensure this is the correct slice

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'], 
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: userReducer, // Use 'user' or rename this to 'auth' if needed
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
        ignoredActions: ['persist/PERSIST'], // Ignore persist actions
        ignoredPaths: ['persist.persistentStorage'], // Ignore specific paths
      },
    }).concat(apiSlice.middleware),
});

// Create persistor
export const persistor = persistStore(store);

// Define types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
