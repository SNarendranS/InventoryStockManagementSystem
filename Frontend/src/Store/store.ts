import { configureStore } from "@reduxjs/toolkit";
import userTokenReducer from "./userTokenSlice";
import { apiSlice } from "./apiSlice"; // import apiSlice
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = { key: "inventory-root", storage };
const persisted = persistReducer(persistConfig, userTokenReducer);

export const store = configureStore({
  reducer: {
    userToken: persisted,
    [apiSlice.reducerPath]: apiSlice.reducer, // add api reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }).concat(apiSlice.middleware), // add api middleware
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
