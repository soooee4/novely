import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AuthExtraReducer } from "./extraReducers/AuthExtraReducer";

/*****************************************************************************
 * states
 *   [권한 관련]
 *   - isLogin           // 로그인 여부
 *   - profile           // 로그인한 유저의 프로필 정보
 * 
 *   [모달 관련]
 *   - modal             // open: 모달 표시 여부, content: 모달 내 컴포넌트 변경 위한 상태값
 *****************************************************************************/

const initialState = {
	isLogin: false,
	profile: {},
  modal: { open: false, content: '' }
};

export const slice = createSlice({
	name: "main",
	initialState,
	reducers: {
		setLogout: (state, action) => {
		  state.isLogin = false;
      state.profile = {};
		},
    setModalOpen: (state, action) => {
      state.modal.open = true;
      state.modal.content = action.payload;
    },
    setModalClose: (state, action) => {
      state.modal.open = false;
      state.modal.content = '';
    }
	},

	extraReducers: (builder) => {
		AuthExtraReducer(builder);
	},
});

const { actions, reducer } = slice;

export const {
  setModalOpen,
  setModalClose,
  setLogout
} = actions;

export default reducer;