// Redux Package Module
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 기본 URL 및 endpoint를 통한 실제 서비스 정의
export const NovelApi = createApi({
	reducerPath: "NovelApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_REQUEST_URL,
		credentials: "omit",
	}),
	endpoints: (builder) => ({
		// 하트 아이콘 눌렀을 때 실행될 기능 함수
		pickNovel: builder.mutation({
			query: (params) => ({ url: "/novel/postPickNovel", method: "POST", body: params}),
			keepUnusedDataFor: 0,
		}),

		// 투표하기 버튼 눌렀을 때 실행될 기능 함수
		postLikeSubNovel: builder.mutation({
			query: (params) => ({ url: "/novel/postLikeSubNovel", method: "POST", body: params }),
			keepUnusedDataFor: 0,
		}),

		// 메인 소설 post
		postMainNovel: builder.mutation({
			query: (params) => ({ url: "/novel/postMainNovel", method: "POST", body: params }),
			keepUnusedDataFor: 0,
		}),

		// 서브 소설 post
		postSubNovel: builder.mutation({
			query: (params) => ({ url: "/novel/postSubNovel", method: "POST", body: params }),
			keepUnusedDataFor: 0,
		}),

		// 특정 작가 소설 get
		getAuthorNovel: builder.query({
			query: (params) => ({ url: "/novel/getAuthorNovel", method: "GET" }),
			keepUnusedDataFor: 0,
		}),

		// 완성 소설 get
		getCompleteNovel: builder.query({
			query: (params) => ({ url: "/novel/getCompleteNovel", method: "GET" }),
			keepUnusedDataFor: 0,
		}),

		// 미완성 소설 get
		getMainNovel: builder.query({
			query: (params) => ({ url: "/novel/getMainNovel", method: "GET" }),
			keepUnusedDataFor: 0,
		}),

		// 완성 소설 목록 get
		getNovels: builder.query({
			query: (params) => ({ url: "/novel/getNovels", method: "GET" }),
			keepUnusedDataFor: 0,
		}),

		// 찜한 완성 소설 목록 get
		getPickNovels: builder.query({
			query: (params) => ({ url: "/novel/getPickNovels", method: "GET" }),
			keepUnusedDataFor: 0,
		}),

		// 찜한 미완성 소설 목록 get
		getPickIncompleteNovels: builder.query({
			query: (params) => ({ url: "/novel/getPickIncompleteNovels", method: "GET" }),
			keepUnusedDataFor: 0,
		}),

		// 미완성 소설 목록 get
		getIncompleteNovels: builder.query({
			query: (params) => ({ url: "/novel/getIncompleteNovels", method: "GET" }),
			keepUnusedDataFor: 0,
		}),

		// 소설에 딸린 서브 소설 목록 get
		getSubNovel: builder.query({
			query: (params) => ({ url: "/novel/getSubNovel", method: "GET" }),
			keepUnusedDataFor: 0,
		}),

		// 작가로서 첫 로그인 시 소개글 작성 patch
		patchFirstAuthor: builder.mutation({
			query: (params) => ({ url: "/novel/patchFirstAuthor", method: "PATCH", body: params }),
			keepUnusedDataFor: 0,
		}),

		// 찜 해제 delete
		deletePickNovel: builder.mutation({
			query: (params) => ({ url: "/novel/deletePickNovel", method: "DELETE", body: params }),
			keepUnusedDataFor: 0,
		}),

		//-----//
	}),
});

// endpoint에 대한 자동 Hook 함수 생성
export const {
	// post
	usePickNovelMutation,
	usePostLikeSubNovelMutation,
	usePostMainNovelMutation,
	usePostSubNovelMutation,
	// get
	useLazyGetAuthorNovelQuery,
	useLazyGetCompleteNovelQuery,
	useGetMainNovelQuery,
	useLazyGetNovelsQuery,
	useLazyGetPickNovelsQuery,
	useLazyGetPickIncompleteNovelsQuery,
	useLazyGetIncompleteNovelsQuery,
	useLazyGetSubNovelQuery,
	// patch
	usePatchFirstAuthorMutation,
	// delete
	useDeletePickNovelMutation,
} = NovelApi;
