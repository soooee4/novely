// extraReducer는 API를 통해 서버에서 받아온 데이터를 어떻게 처리할건지 사후 처리를 담당하는 곳

import { AuthApi } from "redux/services/AuthService";
import { SYSCODE } from "common/code";

// endPoint는 로딩중(matchPending) / 통신 성공(matchFullfilled) / 통신 실패(matchRejected)
export const AuthExtraReducers = (builder) => {
    builder
        .addMatcher(AuthApi.endpoints.postLogin.matchPending, (state, {payload}) => {

        })
        .addMatcher(AuthApi.endpoints.postLogin.matchFulfilled, (state, {payload}) => {
            state.isLogin = true;
            // if (typeof payload.data === "object") {
            //     state.profile = payload.data;
            // } else {
            //     alert(data);
            // }
            if (typeof payload.data === "object") {
                localStorage.setItem("profile",
                    JSON.stringify({
                    user_nickname: data.user_nickname,
                    user_reg_dv: data.user_reg_dv,
                    login_id: data.login_id,
                    image: data.image,
                    author_first_login: data. author_first_login
                    })
                );
                window.location.reload();
            } else {
                alert(data);
            }
        })
        .addMatcher(AuthApi.endpoints.postLogin.matchRejected, (state, {payload}) => {

        })
};