import { lazy } from 'react';

const AppPage = lazy(() => import('pages/App'));
const LoginPage = lazy(() => import('pages/Login'));
const MainPage = lazy(() => import('pages/Main'));
//------------------------------------------------------------------------------------------
// Login
// const Login = lazy(() => import('pages/Login')); // 

//------------------------------------------------------------------------------------------
// 

const pages = {
    AppPage,

    // 로그인 페이지
    LoginPage,

    // 메인 페이지
    MainPage,
}

export default pages;