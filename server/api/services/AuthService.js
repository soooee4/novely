// const pool = require("../../lib/dbConnPool");
// const mapper = require("../../sql");
// const util = require("../../common/util");
// const { MESSAGE } = require("../../common/message");

// // 로그인
// const login = async ({ login_id, login_pw }) => {
// 	const client = await pool.connect();
// 	let sqlId = "Auth.login";

// 	try {
// 		// 유저 정보가 있는지 DB 확인
// 		const isLogin = await client.query(
// 			mapper.makeSql(sqlId, { login_id, login_pw })
// 		);

// 		// user 정보를 담을 변수
// 		let userInfo = null;

// 		// 로그인 시 입력했던 id, pw가 db상에 존재할 경우(유저 정보를 리턴하여 클라이언트로 전송)
// 		if (isLogin.rowCount === 1) {
//       console.log(isLogin.rows)
// 			console.log(isLogin.rows[0].user_reg_dv);
// 			sqlId = isLogin.rows[0].user_reg_dv === 'W' ? "Auth.getAuthUserInfo" : "Auth.getUserInfo";
// 			userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

// 			return userInfo.rows[0];

// 			// 존재하지 않을 경우(false로 처리)
// 		} else {
// 			return MESSAGE.UNMATCHED_LOGIN_INFO;
// 		}
// 	} catch (err) {
// 		console.log(err);
// 	} 
// };

// // 회원가입
// const join = async ({ login_id, login_pw, image }) => {
// 	const client = await pool.connect();
// 	let sqlId = "Auth.isUser";

// 	try {
// 		const isUser = await client.query(mapper.makeSql(sqlId, { login_id }));

// 		// 회원가입 시 입력한 id값이 DB에 존재하는지 확인
// 		if (isUser.rows.length === 1) {
// 			// 존재할 경우
// 			return MESSAGE.ALREADY_JOINED;
// 		} else {
// 			// 존재하지 않는 경우
// 			sqlId = "Auth.join";

// 			// 닉네임 랜덤 생성
// 			const nickname = util.makeRandomNickname();

// 			// 회원 등록
// 			const regditUser = await client.query(
// 				mapper.makeSql(sqlId, {
// 					login_id,
// 					login_pw,
// 					user_nickname: nickname,
// 					image: image ? image : "basic.jpeg",
// 				})
// 			);

// 			// 회원 등록이 성공할 경우 회원 정보 조회 및 컨트롤러로 회원 정보 전송
// 			if (regditUser.rowCount === 1) {
// 				sqlId = "Auth.getUserInfo";
// 				userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

// 				return {
// 					user_nickname: userInfo.rows[0].user_nickname,
// 					user_reg_dv: userInfo.rows[0].user_reg_dv,
// 					login_id: userInfo.rows[0].login_id,
// 				};
        
// 			} else {
//         return MESSAGE.JOIN_FAILED;
//       }
// 		}
// 	} catch (err) {

// 		console.log(err);
// 	} finally {
// 		if (client) client.release();
// 	}
// };

// // 프로필 수정
// const editProfile = async ({
// 	user_nickname,
// 	current_pw,
// 	new_pw,
// 	login_id,
// 	image_file_name,
// 	isAuthor,
// }) => {
// 	const client = await pool.connect();
// 	let sqlId = "Auth.getUserInfo";

// 	try {
// 		// 유저 정보 조회
// 		let userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

// 		let data;

// 		// 사용자가 입력한 현재 비밀번호가 DB에 있는 비밀번호와 일치하는지 확인
// 		if (current_pw !== userInfo.rows[0].login_pw) {
// 			return MESSAGE.UNMATCHED_PASSWORD;

// 		} else {
// 			// 닉네임, 비밀번호, 작가 소개글, 이미지 중 하나만 변경했을 때 빈 값으로 올 경우 기존에 있던 정보를 넣어주기 위한 조건 (논리 연산자 사용)
// 			user_nickname = user_nickname || userInfo.rows[0].user_nickname;
// 			new_pw = new_pw || userInfo.rows[0].login_pw;
// 			image_file_name = image_file_name || userInfo.rows[0].image;

// 			// 일치하는 경우 프로필 수정 실행
// 			/** 클라이언트에서 받은 isAuthor가 false일 경우(일반회원) */
// 			if (!isAuthor) {
// 				sqlId = "Auth.editProfile";
// 				data = await client.query(
// 					mapper.makeSql(sqlId, {
// 						user_nickname,
// 						login_pw: new_pw,
// 						login_id,
// 						image: image_file_name,
// 					})
// 				);

// 				/** 클라이언트에서 받은 isAuthor가 true일 경우(작가회원) */
// 			} else {
// 				sqlId = "Auth.authorEditProfile";
// 				data = await client.query(
// 					mapper.makeSql(sqlId, {
// 						user_nickname,
// 						login_pw: new_pw,
// 						login_id,
// 						author_info: userInfo.rows[0].author_info,
// 						image: image_file_name,
// 					})
// 				);
// 			}

// 			// 프로필 수정 성공 시 사용자가 입력한 닉네임 리턴
// 			// 프로필 수정 실패 경우와 타입으로 비교하기 위해 객체 형태로 전송
// 			if (data.rowCount === 1) return { user_nickname: user_nickname, image: image_file_name };
//       else return MESSAGE.PATCH_PROFILE_FAILED;
			
// 		}
// 	} catch (err) {
// 		console.log(err);

// 	} finally {
// 		if (client) client.release();
// 	}
// };


// module.exports = {
// 	login,
// 	join,
// 	editProfile
// };

const pool = require("../../lib/dbConnPool");
const mapper = require("../../sql");
const util = require("../../common/util");
const { MESSAGE } = require("../../common/message");

// 로그인
const login = async ({ login_id, login_pw }) => {
	const client = await pool.connect();
	let sqlId = "Auth.login";

	login_pw = login_pw.toLowerCase();

	try {
		// 유저 정보가 있는지 DB 확인
		const isLogin = await client.query(
			mapper.makeSql(sqlId, { login_id, login_pw })
		);


		// user 정보를 담을 변수
		let userInfo = null;

		// 로그인 시 입력했던 id, pw가 db상에 존재할 경우(유저 정보를 리턴하여 클라이언트로 전송)
		if (isLogin.rowCount === 1) {
			sqlId = isLogin.rows[0].user_reg_dv === 'W' ? "Auth.getAuthUserInfo" : "Auth.getUserInfo";
			userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

			return userInfo.rows[0];

			// 존재하지 않을 경우(false로 처리)
		} else {
			return MESSAGE.UNMATCHED_LOGIN_INFO;
		}
	} catch (err) {
		console.log(err);
	} 
};

// 회원가입
const join = async ({ login_id, login_pw, image }) => {
	const client = await pool.connect();
	let sqlId = "Auth.isUser";

	try {
		const isUser = await client.query(mapper.makeSql(sqlId, { login_id }));

		// 회원가입 시 입력한 id값이 DB에 존재하는지 확인
		if (isUser.rows.length === 1) {
			// 존재할 경우
			return MESSAGE.ALREADY_JOINED;
		} else {
			// 존재하지 않는 경우
			sqlId = "Auth.join";

			// 닉네임 랜덤 생성
			const nickname = util.makeRandomNickname();

			// 회원 등록
			const regditUser = await client.query(
				mapper.makeSql(sqlId, {
					login_id,
					login_pw,
					user_nickname: nickname,
					image: image ? image : "basic.jpeg",
				})
			);

			// 회원 등록이 성공할 경우 회원 정보 조회 및 컨트롤러로 회원 정보 전송
			if (regditUser.rowCount === 1) {
				sqlId = "Auth.getUserInfo";
				userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

				return {
					user_nickname: userInfo.rows[0].user_nickname,
					user_reg_dv: userInfo.rows[0].user_reg_dv,
					login_id: userInfo.rows[0].login_id,
				};
        
			} else {
        return MESSAGE.JOIN_FAILED;
      }
		}
	} catch (err) {

		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 프로필 수정
const editProfile = async ({
	user_nickname,
	current_pw,
	new_pw,
	login_id,
	image_file_name,
	isAuthor,
}) => {
	const client = await pool.connect();
	let sqlId = isAuthor ? "Auth.getAuthUserInfo" : "Auth.getUserInfo";

	current_pw = current_pw.toLowerCase();

	try {
		// 유저 정보 조회
		let userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));
		let data;

		// 사용자가 입력한 현재 비밀번호가 DB에 있는 비밀번호와 일치하는지 확인
		if (current_pw !== userInfo.rows[0].login_pw) {
			return MESSAGE.UNMATCHED_PASSWORD;

		} else {
			// 닉네임, 비밀번호, 작가 소개글, 이미지 중 하나만 변경했을 때 빈 값으로 올 경우 기존에 있던 정보를 넣어주기 위한 조건 (논리 연산자 사용)
			user_nickname = user_nickname || userInfo.rows[0].user_nickname;
			new_pw = new_pw || userInfo.rows[0].login_pw;
			image_file_name = image_file_name || userInfo.rows[0].image;

			// 일치하는 경우 프로필 수정 실행
			/** 클라이언트에서 받은 isAuthor가 false일 경우(일반회원) */
			if (userInfo.rows[0].user_reg_dv === 'W') {
				sqlId = "Auth.authorEditProfile";
				data = await client.query(
					mapper.makeSql(sqlId, {
						user_nickname,
						login_pw: new_pw,
						login_id,
						author_info: userInfo.rows[0].author_info,
						image: image_file_name,
					})
				);
			} else if (userInfo.rows[0].user_reg_dv === 'G') {
				sqlId = "Auth.editProfile";
				data = await client.query(
					mapper.makeSql(sqlId, {
						user_nickname,
						login_pw: new_pw,
						login_id,
						image: image_file_name,
					})
				);

			}

			// 프로필 수정 성공 시 사용자가 입력한 닉네임 리턴
			// 프로필 수정 실패 경우와 타입으로 비교하기 위해 객체 형태로 전송
			if (data.rowCount === 1) return { user_nickname: user_nickname, image: image_file_name };
      else return MESSAGE.PATCH_PROFILE_FAILED;
			
		}
	} catch (err) {
		console.log(err);

	} finally {
		if (client) client.release();
	}
};


module.exports = {
	login,
	join,
	editProfile
};