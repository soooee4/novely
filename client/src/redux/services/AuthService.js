// Service는 API 설정하는 곳

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SYSCODE } from "common/code";

export const AuthApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: fetchBaseQuery({ 
      baseUrl: process.env.REACT_APP_REQUEST_URL + '/auth',
      credentials: 'include'
    }),
    endpoints: (builder) => ({
        // get => builder.query
        // post, patch, delete => builder.mutation

      // 로그인
      postLogin: builder.mutation({
        query: (params) => ({ url: '/login', method: SYSCODE.REQ_METHOD.POST, body: params }),
        keepUnusedDataFor:0
      }),
    }),
  })
  
  // 위에 API 함수 만들면 아래에서는 자동으로 추천해줌
  export const { 
    usePostLoginMutation
  } = AuthApi;