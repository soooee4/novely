import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AuthExtraReducer } from "./extraReducers/AuthExtraReducer";

/*****************************************************************************
 * states
 *   [권한 관련]
 *   - isLogin           : 로그인 여부
 *   - profile           : 로그인한 유저의 프로필 정보(프로필 이미지, 권한 구분, 로그인 아이디 등 상세하게 기록)
 *****************************************************************************/

const initialState = {
	isLogin: false,
	profile: {},
};

export const slice = createSlice({
	name: "main",
	initialState,
	reducers: {
		// setIsLogin: (state, action) => {
		//   state.isLogin = true;
		// },
	},

	extraReducers: (builder) => {
		AuthExtraReducer(builder);
	},
});

const { actions, reducer } = slice;

export const {} = actions;

export default reducer;
