const pool = require("../../lib/dbConnPool");
const mapper = require("../../sql");
const { MESSAGE } = require("../../common/message");

// 완성 소설 조회 
const getNovels = async ({ login_id }) => {
	const client = await pool.connect();
	let sqlId = "Novel.getNovels";

	try {
		// 소설 데이터를 담을 변수
		let data;

		// 비로그인 상태 시 소설 데이터 조회
		if (!login_id) {
			data = await client.query(mapper.makeSql(sqlId));

			// 로그인 상태 시 소설 데이터 조회
		} else {
			sqlId = "Novel.getNovelsOnLogin";
			data = await client.query(mapper.makeSql(sqlId, { login_id: login_id }));
		}

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 미완성 소설 조회 함수
const getIncompleteNovels = async ({ login_id }) => {
	const client = await pool.connect();
	let sqlId = "Novel.getIncompleteNovels";

	try {
		// 소설 데이터를 담을 변수
		let data;

		// 비로그인 상태 시 소설 데이터 조회
		if (!login_id) {
			data = await client.query(mapper.makeSql(sqlId));

			// 로그인 상태 시 소설 데이터 조회
		} else {
			sqlId = "Novel.getIncompleteNovelsOnLogin";
			data = await client.query(mapper.makeSql(sqlId, { login_id: login_id }));
		}

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 메인 소설 조회 
const getMainNovel = async ({ novel_seqno }) => {
	const client = await pool.connect();
	const sqlId = "Novel.getMainNovel";

	try {
		const data = await client.query(
			mapper.makeSql(sqlId, { novel_seqno: novel_seqno })
		);
		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 작가에 따른 미완성 소설 조회 
const getAuthorNovel = async ({ created_user, login_id }) => {
	const client = await pool.connect();
	let sqlId;

	try {
		// 미완성 소설 데이터와 작가 이미지를 담을 변수
		let data = {
			novel_data: null,
			user_image: null,
		};

		sqlId = "Auth.getUserImg";
		const user_image = await client.query(
			mapper.makeSql(sqlId, {
				user_id: created_user,
			})
		);

		// 클라이언트로 보낼 데이터 중 작가 프로필 이미지 세팅
		data.user_image = user_image.rows[0].image;

		// 작가 아이디와 로그인 아이디가 동일하지 않을 경우
		if (created_user !== login_id) {
			sqlId = "Novel.getAuthorNovel";
		} else {
			// 작가 아이디와 로그인 아이디가 동일할 경우
			sqlId = "Novel.getAuthorMyNovel";
		}

		const novel_data = await client.query(
			mapper.makeSql(sqlId, {
				created_user: created_user,
				login_id: login_id,
			})
		);
		// 클라이언트로 보낼 데이터 중 작가에 속한 소설 정보 세팅
		data.novel_data = novel_data.rows;

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 서브 소설 조회 
const getSubNovel = async ({ main_novel_seqno, user_id }) => {
	const client = await pool.connect();
	const sqlId = "Novel.getSubNovel";

	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
				main_novel_seqno,
				user_id,
			})
		);

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 완성 소설 보기 
const getCompleteNovel = async ({ complete_seqno }) => {
	const client = await pool.connect();
	const sqlId = "Novel.getCompleteNovel";

	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
				complete_seqno,
			})
		);

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 메인 소설 등록 
const postMainNovel = async ({ title, content, created_user, description }) => {
	const client = await pool.connect();
	const sqlId = "Novel.postMainNovel";

	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
				title,
				content,
				created_user,
				description,
			})
		);

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 서브 소설 등록 
const postSubNovel = async ({
	main_novel_seqno,
	title,
	content,
	genre_1,
	genre_2,
	keyword_1,
	keyword_2,
	keyword_3,
	description,
	created_user,
	file,
	image_file_name
}) => {
	const client = await pool.connect();
	const sqlId = "Novel.postSubNovel";

  // 필수값인 장르1, 키워드1 값을 제외한 나머지 값들이 빈 값일 경우 null 처리
  genre_2 = genre_2 === undefined || 'undefined' ? null : genre_2;
	keyword_2 = keyword_2 === undefined || 'undefined' ? null : keyword_2;
	keyword_3 = keyword_3 === undefined || 'undefined' ? null : keyword_3;
  image_file_name = image_file_name === undefined ? file : image_file_name;
  
	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
				main_novel_seqno,
				title,
				content,
				genre_1,
				genre_2,
				keyword_1,
				keyword_2,
				keyword_3,
				description,
				created_user,
				image_file_name
			})
		);

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 소설 찜 기능 
const postPickNovel = async ({ main_novel_seqno, user_id }) => {
	const client = await pool.connect();
	const sqlId = "Novel.postPickNovel";

	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
				main_novel_seqno,
				user_id,
			})
		);

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 소설 찜 해제 기능 
const deletePickNovel = async ({ main_novel_seqno, user_id }) => {
	const client = await pool.connect();
	const sqlId = "Novel.deletePickNovel";

	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
				main_novel_seqno,
				user_id,
			})
		);

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 서브 소설 좋아요 기능 
const postLikeSubNovel = async ({ sub_novel_seqno, user_id }) => {
	const client = await pool.connect();
	let sqlId = "Novel.postLikeSubNovel";

	try {
    // 쿼리 시작
    await client.query("BEGIN");

		let data = await client.query(
			mapper.makeSql(sqlId, {
				sub_novel_seqno,
				user_id,
			})
		);
    sqlId = "Novel.updateLikeCount"
      data = await client.query(
			mapper.makeSql(sqlId, {
				sub_novel_seqno
			})
		);
    
    // 쿼리 실행 이상없다면 커밋
    await client.query("COMMIT");
    
		return MESSAGE.LIKE_SUCCEED;
	} catch (err) {
    // 쿼리 실행 도중 에러 발생 시 roll back
    await client.query("ROLLBACK");
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 서브소설 좋아요 해제 기능 
const deleteLikeSubNovel = async ({ sub_novel_seqno, user_id }) => {
	const client = await pool.connect();
	const sqlId = "Novel.deleteLikeSubNovel";

	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
				sub_novel_seqno,
				user_id,
			})
		);

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 찜한 완성 소설 조회 
const getPickNovels = async ({ login_id }) => {
	const client = await pool.connect();
	const sqlId = "Novel.getNovelsOnLogin";

	try {
		// 완성 소설 조회하여 가공
		const data = await client.query(mapper.makeSql(sqlId, { login_id: login_id }));  
		return data.rows.filter((novel) => novel.pick_yn === "Y"); 

	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 찜한 미완성 소설 조회 
const getPickIncompleteNovels = async ({ login_id }) => {
	const client = await pool.connect();
	const sqlId = "Novel.getPickMainNovels";

	try {
		// 미완성 소설 조회하여 가공
		const data = await client.query(mapper.makeSql(sqlId, { login_id: login_id }));   
		return data.rows.filter((novel) => novel.pick_yn === "Y");

	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};


module.exports = {
	getNovels,
  getIncompleteNovels,
	getMainNovel,
	getSubNovel,
	getCompleteNovel,
	getAuthorNovel,
	postSubNovel,
	postMainNovel,
	postPickNovel,
	deletePickNovel,
	postLikeSubNovel,
	deleteLikeSubNovel,
	getPickNovels,
  	getPickIncompleteNovels
};