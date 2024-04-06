import { MESSAGE } from "common";
import { AuthApi } from "redux/services/AuthService";

export const AuthExtraReducer = (builder) => {
	builder
		// 로그인
		.addMatcher(AuthApi.endpoints.onLogin.matchPending, (state, payload) => {})
		.addMatcher(
			AuthApi.endpoints.onLogin.matchFulfilled, (state, { payload }) => {
				state.profile = payload;
				state.isLogin = true;
				state.modal.open = false;
			}
		)
		.addMatcher(AuthApi.endpoints.onLogin.matchRejected, (state, payload) => {
			alert("로그인 실패");
		})

    // 회원가입
		.addMatcher(AuthApi.endpoints.onJoin.matchPending, (state, payload) => {})
		.addMatcher(
			AuthApi.endpoints.onJoin.matchFulfilled, (state, { payload }) => {
				state.profile = payload;
				state.isLogin = true;
        // ! 아래 alert 처리
        alert("환영합니다 :)")
				state.modal.open = false;

    
      }
		)
		.addMatcher(AuthApi.endpoints.onJoin.matchRejected, (state, payload) => {
			alert("회원가입 실패");
		})


    // 프로필 수정
		.addMatcher(AuthApi.endpoints.editProfile.matchPending, (state, payload) => {
      
    })
		.addMatcher(
			AuthApi.endpoints.editProfile.matchFulfilled, (state, { payload }) => {
        const newData = {
          ...state.profile,
          user_nickname : payload.user_nickname,
          image: payload.image,
          author_info: payload.author_info
        }
        state.profile = newData;
        alert(MESSAGE.EDIT_SUCCEED);
        state.modal.open = false;
			}
		)
		.addMatcher(AuthApi.endpoints.editProfile.matchRejected, (state, payload) => {
			alert("수정 실패");
		});
};
