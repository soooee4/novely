
<h1 style="border-bottom: none;" align="center"> 🎨 NOVELY </h1>


<p> 
NOVELY는 누구나 작가가 될 수 있는 <strong>참여형 웹 소설 플랫폼</strong>입니다. 

작가분들이 만들어놓은 도입부에 원하는 대로 결말을 완성시켜 보고, 같은 이야기가 어떻게 끝날지 다른 사람들의 이야기도 둘러보세요.

다양한 결말 중 기간 내 가장 많은 추천을 받은 결말은 기존 소설과 합쳐져 하나의 작품으로 완성됩니다. 

이후 작가로서 프로필을 설정하여 활동할 수 있고, 다른 예비 작가분들을 위해 새로운 소설의 도입부를 작성할 수 있어요 :D
</p>  

[👉 NOVELY 바로가기](http://54.180.116.208:8080/)
```
ID: boo@novely.com
PW: b12345
```

<!-- 사용한 기술 스택 소개 -->
<h2 id="tech-stack">🛠 Tech stack</h2>

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1704958493091?alt=media&token=bed78897-baa5-41ec-9c6c-df922a58ba95)](https://github.com/msdio/stackticon)




<!-- 주요 기능 소개 -->
<h2 id="features">✨ Features</h2>

#### ① 회원 정보 관련 
|로그인|회원가입|
|---|---|
|![로그인](https://github.com/soooee4/novely/assets/126536384/85c60500-d2bd-43da-aeca-7879eb2ff021)|![회원가입](https://github.com/soooee4/novely/assets/126536384/255046dc-3e25-4ff5-b629-5e8cec7276fe)

|프로필 수정|작가로 권한 변경 후 첫 로그인 시|
|---|---|
|![프로필 수정](https://github.com/soooee4/novely/assets/126536384/197281b4-c0c8-406d-a5bf-1aac491728dc)|![작가 권한 변경 후 첫 로그인](https://github.com/soooee4/novely/assets/126536384/5a320745-dda2-4715-a018-4d22317d5e2d)|

#### ② 소설 관련
|소설 보기|새 소설 쓰기|
|---|---|
|![소설 보기](https://github.com/soooee4/novely/assets/126536384/d4e6d1ad-2488-477c-af31-4acfaca319bb)|![새 소설 쓰기](https://github.com/soooee4/novely/assets/126536384/98534f73-4b08-413b-a0e7-931f846730ca)|

|소설 이어쓰기|소설 찜 기능|
|---|---|
|![소설 이어쓰기](https://github.com/soooee4/novely/assets/126536384/b6ed412d-a7c9-400a-bae5-7b23fe74c6ed)|![소설 찜 기능](https://github.com/soooee4/novely/assets/126536384/932d1be8-fdd6-41fd-9285-8c999e74df38)|

|소설 투표하기|검색, 필터링|
|---|---|
|![소설 투표하기](https://github.com/soooee4/novely/assets/126536384/65989e57-e498-4692-94c6-89fbd2161e31)|![검색, 필터링](https://github.com/soooee4/novely/assets/126536384/868c6101-fc57-4f5f-a2b5-34ef1b9508d1)|

<!-- 디렉토리 구성 -->
<h2 id="directory"> 📂 Directory tree</h2>

```
🎨 NOVELY
├─ .github
└─ 📂 image
	├─ 📂 nov_cover ────────────── 🎨 소설 커버 이미지 저장
	└─ 📂 profile ──────────────── 🎨 유저 프로필 이미지 저장
└─ 📂 source
  ├─ 📂 client
  │  ├─ .env ───────────────────────── 🔧 공통 환경 변수 값 정의
  │  └─ .jsconfig.json ─────────────── 🔧 절대 경로 설정
	│  ├─ 📂 public
	│  └─ 📂 src
  │     ├─ 📂 common ───────────────── 📍 상수 값, 공통 유틸 함수 정의
  │     ├─ 📂 pages ────────────────── 📍 라우팅 페이지 컴포넌트 정의 
  │     ├─ 📂 components ───────────── 📍 재사용될 컴포넌트 정의
        └─ 📂 redux ────────────────── 📍 전역으로 관리할 상태값 정의
  │  └─ 📂 container ─────────── 📦 큰 틀의 레이아웃 정의
  │        ├─ 📂 contents ──────────── 📦 구성이 고정된 컴포넌트
  │        ├─ 📂 controls ──────────── 📦 버튼, 아이콘, 검색바 등
  │        ├─ 📂 layout ────────────── 📦 레이아웃 컴포넌트
  │        └─ 📂 popup ─────────────── 📦 팝업 컴포넌트
  └─ 📂 server
     ├─ 📂 api
     │  ├─ 📂 controllers ──────────── 📞 요청 및 응답 처리
     │  ├─ 📂 services ─────────────── 🛠 SQL 실행 및 데이터 가공
     ├─ 📂 common ──────────────────── 📦 상수 값, 공통 유틸 함수 정의
     ├─ 📂 lib ─────────────────────── 📦 DB 연결 및 공통 처리 모듈 
     ├─ 📂 schedule ────────────────── 📦 스케쥴러 기능 정의
     └─ 📂 sql ─────────────────────── 📦 mybatis 설정 및 쿼리문 연결 
        └─ 📂 mappers ──────────────── 📍 API별 쿼리문 정의
```

<!-- 프로젝트 기록 -->
<h2 id="records">💎 Records</h2>

• [JavaScript TypeError 해결: 상태 초기값 설정](https://velog.io/@soooee/JavaScript-TypeError-해결-상태-초기값-설정)

• [알림창 리팩토링: Alert에서 Toast로 전환](https://velog.io/@soooee/리팩토링-알림창-MUI-Toast로-변경)

• [프로젝트 UI/UX 개선점에 대한 고민](https://velog.io/@soooee/프로젝트-UIUX-개선점에-대한-고민)

• [Redux-toolkit으로 마이그레이션](https://velog.io/@soooee/Redux-toolkit-마이그레이션-모달-간-상태-공유-방식-변경)
