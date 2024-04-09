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
			// alert("로그인 실패");
        state.toast.open = true;
        state.toast.message = MESSAGE.ERROR.CHECK_LOGIN_INFO;
        state.toast.type = 'error';
		})

    	// 회원가입
		.addMatcher(AuthApi.endpoints.onJoin.matchPending, (state, payload) => {})
		.addMatcher(AuthApi.endpoints.onJoin.matchFulfilled, (state, { payload }) => {
			if (payload.message) {
				// alert(payload.message)
        state.toast.open = true;
        state.toast.message = payload.message;
        state.toast.type = 'error';
			} else {
				state.profile = payload;
				state.isLogin = true;
				state.modal = { open: false, content: '', fullWidth: false, width: 0, height: 0 };
        state.toast.open = true;
        state.toast.message = '회원가입 성공';
        state.toast.type = 'success';
			}
      	})
		.addMatcher(AuthApi.endpoints.onJoin.matchRejected, (state, {payload}) => {
      state.toast.open = true;
      state.toast.message = MESSAGE.ERROR.RETRY;
      state.toast.type = 'error';
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
        state.toast.open = true;
        state.toast.message = MESSAGE.EDIT_SUCCEED;
        state.toast.type = 'success';
        // alert(MESSAGE.EDIT_SUCCEED);
        state.modal = { open: false, content: '', fullWidth: false, width: 0, height: 0 };
			}
		)
		.addMatcher(AuthApi.endpoints.editProfile.matchRejected, (state, payload) => {
      state.toast.open = true;
      state.toast.message = MESSAGE.ERROR.CHECK_INFO;
      state.toast.type = 'warning';
		});
};
