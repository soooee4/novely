// slice는 state와 action function을 관리하는 곳

import { createSlice } from "@reduxjs/toolkit";
import { AuthApi } from "redux/services/AuthService";

/**
 * states
 *  - isLogin   : 로그인 여부
 */
const initialState = {
    isLogin: false,
    profile: {}
};

// reducer 정의
export const rootSlice = createSlice({
    name: 'main',
    initialState,

/**
 *  reducers
 *      - setLogout    : 로그아웃 (로그인 여부 변경 및 프로필 삭제)
 */
    reducers: {
        // setLogout: (state, action) => {
        //     state.isLogin = action.payload;
        //     state.profile = {};
        // },
    },
});

const { actions, reducer } = rootSlice;

export const {
    setIsLogin
} = actions;

export default reducer;