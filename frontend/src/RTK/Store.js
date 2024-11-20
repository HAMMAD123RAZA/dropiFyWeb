import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CartSllice from './CartSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig,CartSllice );

const Store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
});

export const persistor = persistStore(Store);
export default Store;