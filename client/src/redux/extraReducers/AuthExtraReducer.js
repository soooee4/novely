import { AuthApi } from "redux/services/AuthService";

export const AuthExtraReducer = (builder) => {
	builder
		// 로그인
		.addMatcher(AuthApi.endpoints.onLogin.matchPending, (state, payload) => {})
		.addMatcher(
			AuthApi.endpoints.onLogin.matchFulfilled,
			(state, { payload }) => {
				state.profile = payload;
				state.isLogin = true;
				alert("성공");
			}
		)
		.addMatcher(AuthApi.endpoints.onLogin.matchRejected, (state, payload) => {
			alert("로그인 실패");
		});
};
