import { configureStore } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { contactsApi } from './contacts/contacts';
import { filterReducer } from './filterReducer/reducer.filter';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
  // devTools: process.env.NODE_ENV === 'development',
})

// setupListeners(store.dispatch)
