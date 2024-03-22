import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import slice from "./slice";
import { AuthApi } from "./services/AuthService";

const persistMainConfig = {
	key: "main",
	storage,
	whitelist: ["isLogin", "profile"],
};

const persistedMainReducer = persistReducer(persistMainConfig, slice);

const store = configureStore({
	reducer: {
		main: persistedMainReducer,
	},

	// middleware 설정
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			//------------------------------------------------
			AuthApi.middleware
		),
});

export default store;
