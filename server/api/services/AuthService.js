const pool = require("../../lib/dbConnPool");

const mapper = require("../../sql");

const util = require("../../common/util");

// 로그인 함수
const login = async ({ login_id, login_pw }) => {
  // 서버와 pg와 연결하는 코드, 기본적으로 들어가는 코드
  const client = await pool.connect();

  // sqlId = "namespace.Id" (해당 namespace에 매칭되는 id의 쿼리를 실행하는 코드)
  let sqlId = "Auth.login";
  // console.log(login_id,1234)
  try {
    // client.query: pg라이브러리에서 제공하는 메서드로 SQL쿼리를 실행하고 그 결과를 반환함
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
    // 만약 try문이 끝났는데도 client가 연결되어 있다면 연결 끊어라
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
    const isUser = await client.query(
      mapper.makeSql(sqlId, { login_id })
    );
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
        mapper.makeSql(sqlId, { login_id, login_pw, user_nickname: nickname }));
 
      // 회원 등록이 성공할 경우 회원 정보 조회 및 컨트롤러로 회원 정보 전송
      if (regditUser.rowCount === 1) {
        // console.log(login_id, nickname);
        return { login_id, nickname };
      }
    }

  } catch (err) {
      console.log(err);
  } finally {
    if (client) client.release();
  }
};

// 프로필 수정 함수
const editProfile = async ({ user_nickname, login_pw, login_id }) => {
	const client = await pool.connect();
	let sqlId = "Auth.editProfile";
	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {
        user_nickname,
        login_pw,
        login_id
			})
		);
		// console.log(data.rowCount, 9999);
		// return data.rowCount;
    let userInfo = null;

    // 정보 수정 성공하여 잘 들어갔을 경우(유저 정보를 리턴하여 클라이언트로 전송)
    if (data.rowCount === 1) {
      sqlId = "Auth.getUserInfo";        
      userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));  
      // return userInfo.rows;
      console.log(userInfo.rows,4545)
    // 존재하지 않을 경우(false로 처리)
    } else {
      return false;
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