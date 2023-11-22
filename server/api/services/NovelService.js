const pool = require("../../lib/dbConnPool");
const mapper = require("../../sql");

// 완성 소설 조회 함수
const getNovel = async ({ user_id }) => {
	const client = await pool.connect();
	let sqlId = "Novel.getNovel";

	try {
		// 소설 데이터를 담을 변수
		let data;

		// 비로그인 상태 시 소설 데이터 조회
		if (!user_id) {
			data = await client.query(mapper.makeSql(sqlId));
			// 로그인 상태 시 소설 데이터 조회
		} else {
			sqlId = "Novel.getNovelOnLogin";
			data = await client.query(mapper.makeSql(sqlId, { user_id: user_id }));
		}

		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 메인 소설 조회 함수
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

// 작가에 따른 미완성 소설 조회 함수
const getAuthorNovel = async ({ created_user, login_id }) => {
	const client = await pool.connect();
	let sqlId = "Novel.getAuthorNovel";

	try {
		// 미완성 소설 데이터를 담을 변수
		let data;

		// 작가 아이디와 유저 아이디가 동일하지 않을 경우
		if (!login_id) {
			data = await client.query(
				mapper.makeSql(sqlId, {
					created_user: created_user,
					login_id: null,
				})
			);
			console.log(data);
			// 작가 아이디와 유저 아이디가 동일할 경우
		} else {
			console.log(created_user, login_id);
			sqlId = "Novel.getAuthorMyNovel";
			data = await client.query(
				mapper.makeSql(sqlId, {
					created_user: created_user,
					login_id: login_id,
				})
			);
		}
		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 서브 소설 조회 함수
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
		// console.log(data,123);
		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 완성 소설 보기 함수
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
		// console.log(data,989898)
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 소설 등록 함수
const postNovel = async ({
	title,
	content,
	created_user,
	genre_1,
	genre_2,
	keyword_1,
	keyword_2,
	keyword_3,
	description,
}) => {
	const client = await pool.connect();

	const sqlId = "Novel.postNovel";
	// console.log(user_id, 1111);

	genre_2 = genre_2 === undefined ? null : genre_2;
	keyword_2 = keyword_2 === undefined ? null : keyword_2;
	keyword_3 = keyword_3 === undefined ? null : keyword_3;

	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
				title,
				content,
				created_user,
				genre_1,
				genre_2,
				keyword_1,
				keyword_2,
				keyword_3,
				description,
			})
		);
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 서브 소설 등록 함수
const postSubNovel = async ({
	sub_title,
	sub_content,
	main_novel_seqno,
	created_user,
	genre_1,
	genre_2,
	keyword_1,
	keyword_2,
	keyword_3,
	sub_description,
}) => {
	const client = await pool.connect();

	const sqlId = "Novel.postSubNovel";
	// console.log(user_id, 1111);

	genre_2 = genre_2 === undefined ? null : genre_2;
	keyword_2 = keyword_2 === undefined ? null : keyword_2;
	keyword_3 = keyword_3 === undefined ? null : keyword_3;

	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
				sub_title,
				sub_content,
				main_novel_seqno,
				created_user,
				genre_1,
				genre_2,
				keyword_1,
				keyword_2,
				keyword_3,
				sub_description,
			})
		);
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 메인 소설 등록 함수
const postMainNovel = async ({ title, content, created_user, description }) => {
	const client = await pool.connect();

	const sqlId = "Novel.postMainNovel";
	// console.log(user_id, 1111);

	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
				title,
				content,
				created_user,
				description,
			})
		);
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 소설 찜 기능 함수
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

// 소설 찜 해제 기능 함수
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

// 서브소설 좋아요 기능 함수
const postLikeSubNovel = async ({ sub_novel_seqno, user_id }) => {
	const client = await pool.connect();
	const sqlId = "Novel.postLikeSubNovel";

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

// 서브소설 좋아요 해제 기능 함수
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

module.exports = {
	getNovel,
	getSubNovel,
	postNovel,
	getMainNovel,
	getCompleteNovel,
	getAuthorNovel,
	postSubNovel,
	postMainNovel,
	postPickNovel,
	deletePickNovel,
	postLikeSubNovel,
	deleteLikeSubNovel,
};
