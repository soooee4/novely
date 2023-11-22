// const pool = require("../../lib/dbConnPool");

// const mapper = require("../../sql");

// const util = require("../../common/util");

// // 로그인 함수
// const login = async ({ login_id, login_pw }) => {

// 	const client = await pool.connect();

// 	let sqlId = "Auth.login";
// 	// console.log(login_id,1234)
// 	try {
// 		const isLogin = await client.query(
// 			mapper.makeSql(sqlId, { login_id, login_pw })
// 		);

// 		// user 정보를 담을 변수
// 		let userInfo = null;
    
// 		// 로그인 시 입력했던 id, pw가 db상에 존재할 경우(유저 정보를 리턴하여 클라이언트로 전송)
// 		if (isLogin.rowCount === 1) {
// 			sqlId = "Auth.getUserInfo";
// 			userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

// 			return userInfo.rows;

// 			// 존재하지 않을 경우(false로 처리)
// 		} else {
// 			return false;
// 		}
// 	} catch (err) {
// 		console.log(err);
// 	} finally {
// 		// try문이 제대로 실행되었을 경우에만 finally까지 옴.
// 		if (client) client.release();
// 	}
// };

// // 회원가입 함수
// const join = async ({ login_id, login_pw }) => {
// 	const client = await pool.connect();

// 	// 닉네임 랜덤 생성
// 	const nickname = util.makeRandomNickname();
// 	// console.log(nickname,4545)

// 	let sqlId = "Auth.isUser";
// 	// console.log(login_id,1234)
// 	try {
// 		const isUser = await client.query(mapper.makeSql(sqlId, { login_id }));
// 		// console.log(isUser.rows,55)

// 		// 회원가입 시 입력한 id값이 DB에 존재하는지 확인
// 		if (isUser.rows.length === 1) {
// 			// 존재할 경우
// 			return false;
// 		} else {
// 			// 존재하지 않는 경우
// 			sqlId = "Auth.join";

// 			// 회원 등록
// 			const regditUser = await client.query(
// 				mapper.makeSql(sqlId, { login_id, login_pw, user_nickname: nickname })
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
// 				// console.log(userInfo.rows[0].user_nickname,userInfo.rows[0].user_reg_dv,11);
// 				// console.log(userInfo.rows[0].user_nickname,8989);
// 				// return userInfo.rows[0].user_nickname;
// 				// console.log(login_id, nickname);
// 				// return { login_id, nickname,user_reg_dv:'G' };
// 			}
// 		}
// 	} catch (err) {
// 		console.log(err);
// 	} finally {
// 		if (client) client.release();
// 	}
// };

// // 프로필 수정 함수
// const editProfile = async ({ user_nickname, current_pw, new_pw, login_id }) => {
// 	const client = await pool.connect();
// 	// 회원정보 가져오는 함수
// 	let sqlId = "Auth.getUserInfo";
// 	try {
// 		// 유저 정보 가져와서 변수에 저장
// 		let userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

// 		// console.log(userInfo.rows[0].login_pw,1001)
// 		// console.log(current_pw,99)
    
// 		// 사용자가 입력한 현재 비밀번호가 DB에 있는 비밀번호와 일치하는지 확인
// 		if (current_pw !== userInfo.rows[0].login_pw) {
// 			return false;
// 		} else {

// 			// 일치하는 경우 프로필 수정 실행
// 			sqlId = "Auth.editProfile";

// 			// 닉네임, 비밀번호 중 하나만 변경했을 때 빈 값으로 올 경우 기존에 있던 정보를 넣어주기 위한 조건 (논리 연산자 사용)
// 			user_nickname = user_nickname || userInfo.rows[0].user_nickname;
// 			new_pw = new_pw || userInfo.rows[0].login_pw;
      
// 			// if (!user_nickname) {
// 			// 	user_nickname = userInfo.rows[0].user_nickname;
// 			// }

// 			// if (!new_pw) {
// 			//   new_pw = userInfo.rows[0].login_pw;
// 			// }

// 			const data = await client.query(
// 				mapper.makeSql(sqlId, {
// 					user_nickname,
// 					login_pw: new_pw,
// 					login_id,
// 				})
// 			);
// 			// console.log(data,33434)
      
// 			// 프로필 수정 성공 시 사용자가 입력한 닉네임 리턴
//       // 프로필 수정 실패 경우와 타입으로 비교하기 위해 객체 형태로 전송
// 			if (data.rowCount === 1) {
//         return { user_nickname : user_nickname }; 
// 				// sqlId = "Auth.getUserInfo";
// 				// userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));
// 				// console.log(userInfo.rows[0].user_nickname,8989);
// 				// return userInfo.rows[0].user_nickname;
// 			} else if (data.rowCount === 0) {
//         return '프로필 수정 실패 :('
//       }
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
// 	editProfile,
// };
const pool = require("../../lib/dbConnPool");

const mapper = require("../../sql");

const util = require("../../common/util");

// 로그인 함수
const login = async ({ login_id, login_pw }) => {

	const client = await pool.connect();

	let sqlId = "Auth.login";
	// console.log(login_id,1234)
	try {
		const isLogin = await client.query(
			mapper.makeSql(sqlId, { login_id, login_pw })
		);

		// user 정보를 담을 변수
		let userInfo = null;
    
		// 로그인 시 입력했던 id, pw가 db상에 존재할 경우(유저 정보를 리턴하여 클라이언트로 전송)
		if (isLogin.rowCount === 1) {
			sqlId = "Auth.getUserInfo";
			userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

			return userInfo.rows;

			// 존재하지 않을 경우(false로 처리)
		} else {
			return false;
		}
	} catch (err) {
		console.log(err);
	} finally {
		// try문이 제대로 실행되었을 경우에만 finally까지 옴.
		if (client) client.release();
	}
};

// 회원가입 함수
const join = async ({ login_id, login_pw }) => {
	const client = await pool.connect();

	// 닉네임 랜덤 생성
	const nickname = util.makeRandomNickname();
	// console.log(nickname,4545)

	let sqlId = "Auth.isUser";
	// console.log(login_id,1234)
	try {
		const isUser = await client.query(mapper.makeSql(sqlId, { login_id }));
		// console.log(isUser.rows,55)

		// 회원가입 시 입력한 id값이 DB에 존재하는지 확인
		if (isUser.rows.length === 1) {
			// 존재할 경우
			return false;
		} else {
			// 존재하지 않는 경우
			sqlId = "Auth.join";

			// 회원 등록
			const regditUser = await client.query(
				mapper.makeSql(sqlId, { login_id, login_pw, user_nickname: nickname })
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
				// console.log(userInfo.rows[0].user_nickname,userInfo.rows[0].user_reg_dv,11);
				// console.log(userInfo.rows[0].user_nickname,8989);
				// return userInfo.rows[0].user_nickname;
				// console.log(login_id, nickname);
				// return { login_id, nickname,user_reg_dv:'G' };
			}
		}
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 프로필 수정 함수
const editProfile = async ({ user_nickname, current_pw, new_pw, login_id }) => {
	const client = await pool.connect();
	let sqlId = "Auth.getUserInfo";

	try {
		// 유저 정보 조회
		let userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));
    
		// 사용자가 입력한 현재 비밀번호가 DB에 있는 비밀번호와 일치하는지 확인
		if (current_pw !== userInfo.rows[0].login_pw) {
			return false;
      
		} else {
			// 일치하는 경우 프로필 수정 실행
			sqlId = "Auth.editProfile";

			// 닉네임, 비밀번호 중 하나만 변경했을 때 빈 값으로 올 경우 기존에 있던 정보를 넣어주기 위한 조건 (논리 연산자 사용)
			user_nickname = user_nickname || userInfo.rows[0].user_nickname;
			new_pw = new_pw || userInfo.rows[0].login_pw;

			const data = await client.query(
				mapper.makeSql(sqlId, {
					user_nickname,
					login_pw: new_pw,
					login_id,
				})
			);
      
			// 프로필 수정 성공 시 사용자가 입력한 닉네임 리턴
      // 프로필 수정 실패 경우와 타입으로 비교하기 위해 객체 형태로 전송
			if (data.rowCount === 1) {
        return { user_nickname : user_nickname }; 
			} else if (data.rowCount === 0) {
        return '프로필 수정 실패 :('
      }
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
	editProfile,
};
