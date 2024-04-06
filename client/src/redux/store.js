import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import slice from "./slice";

import { AuthApi } from "./services/AuthService";
import { NovelApi } from "./services/NovelService";

const persistMainConfig = {
	key: "main",
	storage,
	whitelist: ["isLogin", "profile", "clickNovel", "clickData"],
  blacklist: ["modal"]
};

const persistedMainReducer = persistReducer(persistMainConfig, slice);

const store = configureStore({
	reducer: {
		main: persistedMainReducer,
    
    [AuthApi.reducerPath]: AuthApi.reducer,
    [NovelApi.reducerPath]: NovelApi.reducer,
	},


	// middleware 설정
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			//------------------------------------------------
			AuthApi.middleware,
      NovelApi.middleware
		),
});

export default store;
