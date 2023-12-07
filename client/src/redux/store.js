import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import mainSlice from "redux/slices/mainSlice";

import { AuthApi } from "./services/AuthService";


// --------------------------------------------------------------------
// API 설정

const persistConfig = {
    key: 'main',
    storage,
    whitelist:['isLogin', 'profile']
};

const persistedMainReducer = persistReducer(persistConfig, mainSlice);

const store = configureStore({
    reducer: {
      main: persistedMainReducer, 
  
      //------------------------------------------------------------------------------------------
      // 
      [AuthApi.reducerPath]: AuthApi.reducer,     // 인증
      
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({serializableCheck: false}).concat(
        //------------------------------------------------------------------------------------------
        // Common
        AuthApi.middleware,   // 인증

      ),
  
  });

export default store;