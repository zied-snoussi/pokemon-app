import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';

/**
 * Configures the Redux store with the specified reducers.
 */
const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

/**
 * Type definition for the root state of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type definition for the dispatch function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

export default store;