import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./user/userSlice.js";
import { version } from "react";
import themeSlice from "./Theme/themeSlice.jsx";

const rootReducer = combineReducers({
  user: userSlice,
  theme:themeSlice
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig , rootReducer);

export const store = configureStore({
  reducer : persistedReducer,
  middleware : (getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false})
  
});
export const persistor = persistStore(store)
