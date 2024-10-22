
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import applicantsData from '../features/auth/applicationView'
const persistConfig = {
  key: 'auth',    
  storage,       
};


const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, 
    applicants: applicantsData
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store); // Create the persistor

export default store;
