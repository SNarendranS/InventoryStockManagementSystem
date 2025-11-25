import { configureStore } from "@reduxjs/toolkit";
import userTokenReducer from "./userTokenSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Import your split API slices
import { authApi } from "../Services/authApi";
import { productApi } from "../Services/productApi";
import { transactionApi } from "../Services/transactionApi";
import { dashboardApi } from "../Services/dashboardApi";
import { categoryApi } from "../Services/CategoryApi";

const persistConfig = { key: "inventory-root", storage };
const persistedUserToken = persistReducer(persistConfig, userTokenReducer);

export const store = configureStore({
  reducer: {
    userToken: persistedUserToken,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,

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
    })
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(transactionApi.middleware)
      .concat(dashboardApi.middleware),

});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;