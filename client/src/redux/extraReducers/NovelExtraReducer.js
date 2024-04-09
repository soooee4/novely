import { NovelApi } from "redux/services/NovelService";

export const NovelExtraReducer = (builder) => {
  builder
    // 하트 아이콘 눌렀을 때 실행될 기능 함수
    .addMatcher(NovelApi.endpoints.pickNovel.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.pickNovel.matchFulfilled,(state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.pickNovel.matchRejected, (state, payload) => {

    })

    // 투표하기 버튼 눌렀을 때 실행될 기능 함수
    .addMatcher(NovelApi.endpoints.postLikeSubNovel.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.postLikeSubNovel.matchFulfilled, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.postLikeSubNovel.matchRejected, (state, payload) => {
      
    })

    // 메인 소설 post
    .addMatcher(NovelApi.endpoints.postMainNovel.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.postMainNovel.matchFulfilled, (state, {payload}) => {
      // 모달창 닫기
      state.modal = { open: false, content: '', fullWidth: false, width: 0, height: 0 };
      state.postNovel = { file: 'cover_basic.jpg' };
      state.color = "#ffffff";
      
      // 메시지 노출
      state.toast.open = true;
      state.toast.message = payload.message;
      state.toast.type = 'success';

    })
    .addMatcher(NovelApi.endpoints.postMainNovel.matchRejected, (state, payload) => {

    })

    // 서브 소설 post
    .addMatcher(NovelApi.endpoints.postSubNovel.matchPending, (state, payload) => {
      
    })
    .addMatcher(NovelApi.endpoints.postSubNovel.matchFulfilled, (state, {payload}) => {
      // modal, postNovel 상태 초기화
      state.modal = { open: false, content: '', fullWidth: false, width: 0, height: 0 };
      state.postNovel = { file: 'cover_basic.jpg' };
      state.color = "#ffffff";

      // 메시지 노출
      state.toast.open = true;
      state.toast.message = payload.message;
      state.toast.type = 'success';

      // 데이터 재조회 flag 변경
      state.reset = true;
      
    })
    .addMatcher(NovelApi.endpoints.postSubNovel.matchRejected, (state, payload) => {
      
    })

    // 특정 작가 소설 get
    .addMatcher(NovelApi.endpoints.getAuthorNovel.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.getAuthorNovel.matchFulfilled, (state, { payload }) => {

    })
    .addMatcher(NovelApi.endpoints.getAuthorNovel.matchRejected, (state, payload) => {

    })

    // 완성 소설 get
    .addMatcher(NovelApi.endpoints.getCompleteNovel.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.getCompleteNovel.matchFulfilled, (state, { payload }) => {

    })
    .addMatcher(NovelApi.endpoints.getCompleteNovel.matchRejected, (state, payload) => {

    })

    // 미완성 소설 get
    .addMatcher(NovelApi.endpoints.getMainNovel.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.getMainNovel.matchFulfilled, (state, { payload }) => {

    })
    .addMatcher(NovelApi.endpoints.getMainNovel.matchRejected, (state, payload) => {

    })

    // 완성 소설 목록 get
    .addMatcher(NovelApi.endpoints.getNovels.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.getNovels.matchFulfilled, (state, { payload }) => {

    })
    .addMatcher(NovelApi.endpoints.getNovels.matchRejected, (state, payload) => {

    })

    // 찜한 완성 소설 목록 get
    .addMatcher(NovelApi.endpoints.getPickNovels.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.getPickNovels.matchFulfilled, (state, { payload }) => {

    })
    .addMatcher(NovelApi.endpoints.getPickNovels.matchRejected, (state, payload) => {

    })

    // 찜한 미완성 소설 목록 get
    .addMatcher(NovelApi.endpoints.getPickIncompleteNovels.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.getPickIncompleteNovels.matchFulfilled, (state, { payload }) => {

    })
    .addMatcher(NovelApi.endpoints.getPickIncompleteNovels.matchRejected, (state, payload) => {

    })

    // 미완성 소설 목록 get
    .addMatcher(NovelApi.endpoints.getIncompleteNovels.matchPending, (state, payload) => {
       
    })
    .addMatcher(NovelApi.endpoints.getIncompleteNovels.matchFulfilled, (state, { payload }) => {

    })
    .addMatcher(NovelApi.endpoints.getIncompleteNovels.matchRejected, (state, payload) => {

    })

    // 소설에 딸린 서브 소설 목록 get
    .addMatcher(NovelApi.endpoints.getSubNovel.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.getSubNovel.matchFulfilled, (state, { payload }) => {

    })
    .addMatcher(NovelApi.endpoints.getSubNovel.matchRejected, (state, payload) => {

    })

    // 작가로서 첫 로그인 시 소개글 작성 patch
    .addMatcher(NovelApi.endpoints.patchFirstAuthor.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.patchFirstAuthor.matchFulfilled, (state, { payload }) => {

    })
    .addMatcher(NovelApi.endpoints.patchFirstAuthor.matchRejected, (state, payload) => {

    })

    // 찜 해제 delete

    .addMatcher(NovelApi.endpoints.deletePickNovel.matchPending, (state, payload) => {

    })
    .addMatcher(NovelApi.endpoints.deletePickNovel.matchFulfilled, (state, { payload }) => {

    })
    .addMatcher(NovelApi.endpoints.deletePickNovel.matchRejected, (state, payload) => {

    });

  //-----
};
