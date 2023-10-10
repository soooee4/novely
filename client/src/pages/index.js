import { lazy } from 'react';

const AppPage = lazy(() => import('pages/App'));
const MainPage = lazy(() => import('pages/Main'));
const NovDetailPage = lazy(() => import('pages/NovDetail'));

//------------------------------------------------------------------------------------------
// Login
// const Login = lazy(() => import('pages/Login')); // 

//------------------------------------------------------------------------------------------
// 

const pages = {
    AppPage,

    // 메인 페이지
    MainPage,

    // 소설 상세 페이지
    NovDetailPage,
}

export default pages;