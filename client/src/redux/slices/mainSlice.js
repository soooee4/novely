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

    // extraReducers: (builder) => {
    //     builder
    //     .addMatcher(AuthApi.endpoints.postLogin.matchPending, (state, {payload}) => {

    //     })
    //     .addMatcher(AuthApi.endpoints.postLogin.matchFulfilled, (state, {payload}) => {
    //         state.isLogin = true;
    //         // if (typeof payload.data === "object") {
    //         //     state.profile = payload.data;
    //         // } else {
    //         //     alert(data);
    //         // }
    //         if (typeof payload.data === "object") {
    //             localStorage.setItem("profile",
    //                 JSON.stringify({
    //                 user_nickname: data.user_nickname,
    //                 user_reg_dv: data.user_reg_dv,
    //                 login_id: data.login_id,
    //                 image: data.image,
    //                 author_first_login: data. author_first_login
    //                 })
    //             );
    //             window.location.reload();
    //         } else {
    //             alert(data);
    //         }
    //     })
    //     .addMatcher(AuthApi.endpoints.postLogin.matchRejected, (state, {payload}) => {

    //     })
    // }
});

const { actions, reducer } = rootSlice;

export const {
    setIsLogin
} = actions;

export default reducer;