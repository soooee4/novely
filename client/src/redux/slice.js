import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AuthExtraReducer } from "./extraReducers/AuthExtraReducer";
import { NovelExtraReducer } from "./extraReducers/NovelExtraReducer";

/*****************************************************************************
 * states
 *   [권한 관련]
 *   - isLogin            : 로그인 여부
 *   - profile            : 로그인한 유저의 프로필 정보(프로필 이미지, 권한 구분, 로그인 아이디 등 상세하게 기록)
 *   - modal              : modal 정보(open여부, 콘텐트 내용, 최대화, 넓이, 높이)
 *   - clickData          : 클릭한 영역의 정보 담기(현재는 메인/서브 작가 아이디 클릭에 쓰임)
 *   - clickNovel         :
 *   - clickSubNovel      :
 *   - postNovel          : 입력된 소설 데이터(서버 전송용 / file명은 기본값 세팅 필요)
 *   - subNovels          :
 *   - color              :
 *   - reset              : POST, PATCH, DELETE 성공 시 데이터 재조회를 위한 flag
 *****************************************************************************/

const initialState = {
	isLogin: false,
	profile: {},
  modal: { open: false, content: '', fullWidth: false, width: 0, height: 0 },
  clickData: {
    authorId: '',
    authorNickname: '',
    main_seqno: ''
  },
  clickNovel: {},
  clickSubNovel: {},
  postNovel: { file: 'cover_basic.jpg' },
  subNovels: [],
  color: '#ffffff',
  reset: false,
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
			const { content, fullWidth, width, height } = action.payload;
			state.modal.open = true;
			state.modal.content = content;
			state.modal.fullWidth = fullWidth;
			state.modal.width = width;
			state.modal.height = height;
		},
		setModalClose: (state, action) => {
			state.modal.open = false;
			state.modal.content = "";
			// 모달 닫을 때 color 상태 초기화
			state.color = "#ffffff";
		},

		setClickNovel: (state, action) => {
			state.clickNovel = action.payload;
		},

		setClickSubNovel: (state, action) => {
			state.clickSubNovel = action.payload;
		},

		setClickData: (state, action) => {
			const { authorId, authorNickname, main_seqno } = action.payload;
			state.clickData.authorId = authorId;
			state.clickData.authorNickname = authorNickname;
			state.clickData.main_seqno = main_seqno;
		},

		// 소설 데이터 등록(메인/서브)
		setPostNovelData: (state, action) => {
			// clear 키값 존재 시 postNovel 초기화
			if (action.payload.clear) {
				state.postNovel = { file: "cover_basic.jpg" };
			} else {
				state.postNovel = {
					...state.postNovel,
					...action.payload,
				};
			}
		},

		setSubNovels: (state, action) => {
			state.subNovels = action.payload;
		},

		// 모달 배경색 설정
		setColor: (state, action) => {
			let color;
			switch (action.payload) {
				case 1:
					color = "#ffffff";
					break;
				case 2:
					color = "#f2e8cf";
					break;
				case 3:
					color = "#121212";
					break;
				default:
					color = "#ffffff";
			}

			state.color = color;
		},

		setReset: (state, action) => {
			state.reset = action.payload;
		},
	},

	extraReducers: (builder) => {
		AuthExtraReducer(builder);
		NovelExtraReducer(builder);
	},
});

const { actions, reducer } = slice;

export const {
  setModalOpen,
  setModalClose,
  setLogout,
  setClickNovel,
  setClickSubNovel,
  setClickData,
  setSubNovels,
  setPostNovelData,
  setColor,
  setReset
} = actions;

export default reducer;