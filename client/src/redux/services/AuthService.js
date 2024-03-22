// Redux Package Module
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 기본 URL 및 endpoint를 통한 실제 서비스 정의
export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_REQUEST_URL,
    credentials: 'omit',
  }),
  endpoints: (builder) => ({
    // 로그인
    onLogin: builder.mutation({
      query: (params) => ({ url: '/auth/login', method: 'POST', body: params }),
      keepUnusedDataFor:0
    }),
  })
})


// endpoint에 대한 자동 Hook 함수 생성
export const {
  useOnLoginMutation
} = AuthApi;