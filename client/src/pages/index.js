import { lazy } from "react";

const AppPage = lazy(() => import("pages/App"));
const MainPage = lazy(() => import("pages/Main"));
const NovDetailPage = lazy(() => import("pages/NovDetail"));
const AuthorMyNov = lazy(() => import("pages/AuthorMyNov"));
const FavoriteNov = lazy(() => import("pages/FavoriteNov"));

const pages = {
	AppPage,

	// 메인 페이지
	MainPage,

	// 소설 상세 페이지
	NovDetailPage,

	// 작가 권한 내 작품 페이지
	AuthorMyNov,

  // 찜한 작품 페이지
	FavoriteNov,
};

export default pages;
