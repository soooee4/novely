
<h1 style="border-bottom: none;" align="center"> NOVELY </h1>


<p align="center"> 
<strong>NOVELY는 누구나 작가가 될 수 있는 참여형 웹 소설 플랫폼입니다. </strong>


소설을 읽다가 '이 결말..... 인정할 수 없어 😧' 하신 적, 한 번쯤은 있으시죠? 

노벨리에는 어떤 이야기에도 결말이 정해져 있지 않아요. 

작가분들이 만들어놓은 도입부에 원하는 대로 결말을 완성시켜 보고, 같은 이야기가 어떻게 끝날지 다른 사람들의 이야기도 둘러보세요.

다양한 결말 중 기간 내 가장 많은 추천을 받은 결말은 기존 소설과 합쳐져 하나의 작품으로 완성됩니다. 

이후 작가로서 프로필을 설정하여 활동할 수 있고, 다른 예비 작가분들을 위해 새로운 소설의 도입부를 작성할 수 있어요 :)


</p>  

<br>

> 🗝️ 배포 링크 및 테스트 계정

[NOVELY 시작하기](http://54.180.116.208:8080/)
```
ID: boo@novely.com
PW: b12345
```

<!-- 사용한 기술 스택 소개 -->
<h2 id="tech-stack">🛠 사용한 기술 스택</h2>

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1704958493091?alt=media&token=bed78897-baa5-41ec-9c6c-df922a58ba95)](https://github.com/msdio/stackticon)




<!-- 주요 기능 소개 -->
<h2 id="overview">🖥 주요 기능 소개</h2>

### 1) 유저 관련
|로그인|회원가입|
|---|---|
|![로그인](https://github.com/soooee4/novely/assets/126536384/85c60500-d2bd-43da-aeca-7879eb2ff021)|![회원가입](https://github.com/soooee4/novely/assets/126536384/255046dc-3e25-4ff5-b629-5e8cec7276fe)

|프로필 수정|작가로 권한 변경 후 첫 로그인 시|
|---|---|
|![프로필 수정](https://github.com/soooee4/novely/assets/126536384/197281b4-c0c8-406d-a5bf-1aac491728dc)|![작가 권한 변경 후 첫 로그인](https://github.com/soooee4/novely/assets/126536384/5a320745-dda2-4715-a018-4d22317d5e2d)|

### 2) 소설 관련
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
<h2 id="directory"> 📂 디렉토리 구성</h2>

```
🎨 NOVELY
├─ .github
└─ 📂 image
	├─ 📂 nov_cover ──────────────────── 🎨 소설 커버 이미지 저장
	└─ 📂 profile ────────────────────── 🎨 유저 프로필 이미지 저장
└─ 📂 source
  ├─ 📂 client
  │  ├─ .env ───────────────────────── 🔧 공통 환경 변수 값 정의
  │  ├─ .jsconfig.json ─────────────── 🔧 절대 경로 설정
	│  ├─ 📂 public
	│  └─ 📂 src
  │     ├─ 📂 common ───────────────── 📍 상수 값, 공통 유틸 함수 정의
  │     ├─ 📂 pages ────────────────── 📍 라우팅 페이지 컴포넌트 정의 
  │     └─ 📂 components ───────────── 📍 재사용될 컴포넌트 정의
	│  ├─ 📂 container ───────────────── 📦 큰 틀의 레이아웃 정의
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

<!-- 핵심 코드 -->
<h2 id="core-code">💎 핵심 코드</h2>

<details>
  <summary>&nbspPopup change</summary>

- 해당 프로젝트에서는 버튼 클릭 후 변화되는 state값에 따라 팝업의 내용들이 바뀌게 됩니다. 이를 위해 popupChange라는 함수를 사용하여 state값에 따른 컴포넌트들을 렌더링하도록 하였습니다.

```
const NovDetail = () => {
	// 팝업 내용 State
	const [popup, setPopup] = useState("login");
  // ... other state
	
	const popupChange = () => {
	    // 로그인
	    if (popup === "login") {
	      return (
	        <LoginPopup
	          changeState={() => setPopup("join")}
	          closeModal={closeModal}
	          isLogin={() => setIsLogin(true)}
	        />
	      );
	
	      // 회원가입
	    } else if (popup === "join") {
	      return <JoinPopup 
								profile={profile} 
								setProfile={setProfile} 
							 />
	
	      // 프로필 수정
	    } else if (popup === "editProfile") {
	      return (
	        <EditProfilePopup
	          profile={profile}
	          setProfile={setProfile}
	          closeModal={closeModal}
	        />
	      );
	    }
	  };
	
	// ... other functions

	return (
		<>
			// .... other components
			<ModalPopup
					fullWidth
					open={modal}
					width={modalWidth(popup)}
					onClose={closeModal}
					height={modalHeight(popup)}
			>
				{popupChange()}
			</ModalPopup>
		</>
	)
};

export default NovDetail;
```

- 서버와의 통신 횟수를 줄이고, 데이터를 효율적으로 관리하기 위해 각 팝업에서 여러가지의 데이터를 입력받아 한번에 처리합니다. 각 컴포넌트의 입력값 (title, content 등)을 페이지(NovDetail)에 모아 서버로(postSubNovData) 보냅니다.

```
const NovDetail = () => {
  // ... other state
  // 서버에 post하기 위한 소설 State
	const [regditNovData, setRegditNovData] = useState({
		main_novel_seqno: null,
		title: null,
		content: null,
		genre_1: null,
		genre_2: null,
		keyword_1: null,
		keyword_2: null,
		keyword_3: null,
		description: null,
		file: "cover_basic.jpg",
		created_user: profile.login_id,
	});

	// WriteSubNovPopup에서 입력된 data(title, content) redgitNovData에 세팅
	const setTitleContent = (data) => {
		setRegditNovData((prevState) => ({
			...prevState,
			title: data.title === "" ? novel.title : data.title, 
			content: data.content,
			main_novel_seqno: data.main_novel_seqno,
		}));
	};
	
	const popupChange = () => {
		if (popup === "writeNov") {
			return (
				<WriteSubNovPopup
					mainNovel={mainNovel}
					changeState={() => setPopup("selectTag")}
					setTitleContent={(data) => setTitleContent(data)}
          color={color}
				/>
			);
		} else if (popup === "novCover") {
			return (
				<SetNovCoverPopup
					setCoverImage={(data) => setCoverImage(data)}
					// 데이터가 입력되는 마지막 모달 팝업인 SetNovCoverPopup에 post기능 함수를 넘겨 '제출'버튼 클릭 시 서버로 데이터를 보낼 수 있게 함
					postSubNovData={postSubNovData}
          color={color}
				/>
			);
		}
	};

	const postSubNovData = async () => {
		postData("novel/postSubNovel", redgitNovData).then(msg => {
			alert(msg);
			closeModal();
		});
	};
	
	// ... other functions

	return (
		<>
			// .... other components
			<ModalPopup
					fullWidth
					open={modal}
					width={modalWidth(popup)}
					onClose={closeModal}
					height={modalHeight(popup)}
			>
				{popupChange()}
			</ModalPopup>
		</>
	)
};

export default NovDetail;
``` 


</details>


<details>
  <summary>&nbsp스케줄러 도입</summary>

- 해당 프로젝트에서는 등록된 원 소설이 30일이 지나면 자동으로 가장 많이 좋아요를 받은 후속 소설을 선정해 데이터를 합쳐 완성작으로 만듭니다. 이를 구현하기 위해 스케줄러를 도입하여  매일 00:00에 스케줄러를 실행하도록 구현하였습니다.
  
```
[server.js]

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const routes = require("./api");

// scheduler setting
const schedule = require('./schedule')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../image')));

app.use("/", routes);

app.listen(8080, function () {
  // 매일 00:00 스케쥴러 시작
  // 서버 실행 시 스케쥴러 기능 실행
  schedule.start();
  console.log("listening on 8080");
});
```
- 서버 실행 파일 server.js에 서버 실행 시 스케쥴러 기능이 실행될 수 있도록 세팅합니다.
```
[batchUpdateNovAndAuthor.js]

const schedule = require("node-schedule");
const pool = require("../lib/dbConnPool");
const mapper = require("../sql");

const batchUpdateNovAndAuthor = async () => {
  // 매일 오전 00:00 실행
  schedule.scheduleJob("* 0 0 * * *", async () => {
    const client = await pool.connect();
    let sqlId;

    try {
      // 쿼리 시작
      await client.query("BEGIN");

      // 30일 경과된 메인 소설 순번 배열
      let main_seqno = [];  
      // 메인 소설에 엮인 서브 소설 순번 배열
			const sub_seqno = []; 
			// 좋아요를 가장 많이 받은 서브 소설의 작가 아이디 배열
      let sub_created_user = []; 
			// 서브 소설이 하나 이상 존재하는 메인 소설 순번 배열
      const sub_more_than_zero_main_seqno = [];
	// 서브 소설 중 좋아요가 적어도 하나 이상인 메인 소설 순번 배열     
      const like_more_than_zero_main_seqno = [];
	// 30일 경과 후 엮인 서브 소설이 하나도 없는 메인 소설 순번 배열    
      let postpone_main_seqno = [];                 

      // 작성한지 30일 경과된 미완성 메인 소설 조회
      sqlId = "Schedule.checkIncompleteNov";
      const mainNov = await client.query(mapper.makeSql(sqlId, {}));
      mainNov.rows.forEach((nov) => main_seqno.push(nov.novel_seqno));

      if (main_seqno.length > 0) {
        // 엮인 서브 소설이 하나 이상 존재하는 미완성 메인 소설 조회
        sqlId = "Schedule.checkElectedIncompleteNov";
        const electedMainNov = await client.query(mapper.makeSql(sqlId, { main_seqno }));
        electedMainNov.rows.forEach((nov) => sub_more_than_zero_main_seqno.push(nov.main_novel_seqno));
      
        // 완성 소설 승급이 미뤄지는 메인 소설 순번 세팅
        postpone_main_seqno = main_seqno.filter(seq => !sub_more_than_zero_main_seqno.includes(seq));
        
        // 좋아요 수가 가장 많은 서브 소설 정보 조회(좋아요가 최소 0개 이상이어야 함)
        sqlId = "Schedule.getMostLikeWriter";
        const mostLikeNov = await client.query(
          mapper.makeSql(sqlId, { sub_more_than_zero_main_seqno })
        );
        mostLikeNov.rows.forEach(nov => {
          // complete_yn이 'Y'로 변경될 서브 소설 순번 세팅
          sub_seqno.push(nov.sub_novel_seqno);
          // 작가로 권한 변경되어야 할 유저 아이디 세팅
          sub_created_user.push(nov.sub_author_id);
          // 엮인 서브 소설 중 좋아요가 적어도 하나 이상인 메인 소설 순번 세팅
          like_more_than_zero_main_seqno.push(nov.main_novel_seqno);
        })
        
        // 승급될 유저 아이디 중복 값 제거(예: boo@novely.com가 쓴 서브 소설 여러개 당선 시)
        sub_created_user = Array.from(new Set(sub_created_user));
        // 서브 소설 중 좋아요가 전부 0인 메인 소설 seqno를 기존 승급 연기 대상인 메인 소설 seqno에 추가
        postpone_main_seqno = Array.from(new Set([ ...postpone_main_seqno, ...sub_more_than_zero_main_seqno.filter(v => !like_more_than_zero_main_seqno.includes(v)) ]));

        // 완성 소설 테이블에 데이터 입력
        sqlId = "Schedule.postCompleteNovel";
        await client.query(
          mapper.makeSql(sqlId, { mostLikeNov: mostLikeNov.rows })
        );

        // 완성 소설 승급이 미뤄진 메인 소설들의 작성일자 초기화
        if (postpone_main_seqno.length > 0) {
          sqlId = "Schedule.initCreatedDatePostponeNov";
          await client.query(mapper.makeSql(sqlId, { postpone_main_seqno }));
        }

        // 미완 메인 소설 완성 여부 Y로 일괄 변경
        sqlId = "Schedule.patchNovToComplete";
        await client.query(
          mapper.makeSql(sqlId, { like_more_than_zero_main_seqno })
        );

        // 미완 서브 소설 완성 여부 Y로 일괄 변경
        sqlId = "Schedule.patchSubNovToComplete";
        await client.query(
          mapper.makeSql(sqlId, { like_more_than_zero_main_seqno })
        );

        // 좋아요 수 가장 많은 일반 유저들의 권한을 작가로 일괄 변경
        sqlId = "Schedule.patchToAuthor";
        await client.query(
          mapper.makeSql(sqlId, { sub_created_user })
        );

        console.log(
          `현재 기준 작성한지 30일이 넘어 승급될 미완 메인 소설들의 seqno는 ${main_seqno} 입니다.
          서브 소설이 존재하지 않거나, 좋아요가 없어 승급이 미루어질 메인 소설들의 seqno는 ${postpone_main_seqno},
          승급이 이루어질 메인 소설들의 seqno는 ${like_more_than_zero_main_seqno} 입니다.
          승급될 서브 소설의 작가 ID는 ${sub_created_user} 입니다. 
          일괄 업데이트 완료되었습니다.`
        );
      }
        
      // 쿼리 실행 이상없다면 커밋
      await client.query("COMMIT");
    } catch (err) {
      // 쿼리 실행 도중 에러 발생 시 roll back
      await client.query("ROLLBACK");
      console.log(err);
    }
  });
};

module.exports = batchUpdateNovAndAuthor;
```
- 30일이 지난 원 소설 중 등록된 후속 소설이 하나도 없거나, 투표를 하나도 받지 못했을 경우 30일의 추가 투표 시간을 가지도록 등록 날짜를 초기화 합니다. 

- 후속 소설이 하나 이상 존재하면서 투표를 1개 이상 받은 경우 해당 후속 소설을 쓴 사용자의 예비작가 -> 작가 권한 변경과 함께 두 소설을 합쳐 완성 소설 테이블에 입력합니다.
</details>

<h2 id="troble-shooting">💡 트러블 슈팅</h2>


<details>
  <summary>&nbsp이미지 파일 불러오기</summary>

<h3>💥 문제 배경</h3>
이미지 파일을 불러올 때, 파일명에 특수 문자가 포함되어 있을 경우 에러가 발생하는 문제가 있었습니다. 특히, 커버 이미지 등록 시 제목과 동일한 이름으로 저장하는 방식을 사용하였는데, 이 때 제목에 특수 문자(\, /, :, * 등)가 포함되어 있을 경우 문제가 발생하였습니다.

<h3>💡 해결 방법</h3>

```
[Client]

// 소설 커버 이미지 영역
const Cover = styled(Box)({
	width: "100%",
	minHeight: 290,
	borderRadius: 15,
	backgroundColor: COLOR.PURPLE,
	marginBottom: 9,
  	"&:hover": {
		opacity: 0.7,
		cursor: "pointer",
	},
});

const NovelCard = (props) => {
	return (
		<>
			<Cover
				onClick={props.onClick}
				style={{
					backgroundImage: `url(
						// process.env.REACT_APP_COVER_IMAGE_DIRECTORY 
						// => http://서버ip:포트/nov_cover
						${process.env.REACT_APP_COVER_IMAGE_DIRECTORY}/
						${encodeURIComponent(props.cover_image)})`,
					backgroundSize: "cover",
				}}
			/>
		</>
	)
};

export default NovelCard;

[Server]
// image 폴더 접근 허용
app.use(express.static(path.join(__dirname, '../../image')));
```
이 문제를 해결하기 위해, 이미지 파일명을 생성할 때 고유한 값을 사용하였습니다. 소설 커버 이미지 파일 생성 시 primary key인 sequence를 이용해 ‘sequence.확장자명’ 으로 파일을 생성하고, database cover_image 컬럼에 입력 시에도 ‘sequence.확장자명’으로 등록되도록 변경하였습니다.

<h3>🌱 결과 및 배운 점</h3>
cover_image 컬럼에 seqno.확장자명으로 데이터가 들어가고, 이미지가 정상적으로 출력된 것을 확인할 수 있었습니다. 이를 통해 파일 시스템과 웹에서 사용하는 문자열에는 특별한 주의가 필요하다는 점을 깨달았습니다.
</details>

</details>



<h2 id="plans"> 🧐 리팩토링 계획</h2>
</details>

<h4>&nbsp1. 반응형 CSS 적용</h4>
다양한 디바이스에서 최적화된 사용자 경험을 제공하기 위해, 미디어 쿼리를 활용하여 반응형 CSS를 적용할 계획입니다.

<h4>&nbsp2. Redux를 이용한 전체 상태 관리</h4>
프로젝트를 진행하며 props로 처리한 상태 관리에 불편함을 느꼈습니다.

- 팝업 간 state 공유가 불가능해 한 페이지에서 모든 state를 관리해야 했습니다.

- 팝업 내 색상 변경 아이콘을 누를 시 변경된 색상 값 업데이트를 위해 자식 컴포넌트(팝업)에서 부모 컴포넌트(페이지)에 전달 후, 다시 내려줘야 하는 불편함이 있었습니다.

이 과정에서 전체 상태값 관리에 대한 필요성을 느껴 Redux를 도입해 상태 관리를 개선하려고 합니다.

<h4>&nbsp3. winston 라이브러리 활용하여 로그 처리 기능 추가</h4>

<h4>&nbsp4. 소설 수정 및 임시 저장 기능 추가</h4>
