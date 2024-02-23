const pool = require("../../lib/dbConnPool");
const mapper = require("../../sql");
const util = require("../../common/util");
const { MESSAGE } = require("../../common/message");
// const { userInfo } = require("os");

// 로그인
const login = async ({ login_id, login_pw }) => {
  const client = await pool.connect();
  let sqlId;

  try {
    // 사용자 인증 체크용 데이터 조회
    sqlId = "Auth.getAuthCheckInfo";
    const authCheckInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

    // 미등록 사용자 체크
    if (authCheckInfo.rowCount === 0) return MESSAGE.UNMATCHED_LOGIN_INFO;

    // 인증 체크용 데이터 가져오기
    const { cur_pw, hashsalt, user_reg_dv } = { ...authCheckInfo.rows[0] };

    login_pw = login_pw.toLowerCase();
    const { hashPassword } = await util.makeHashedPassword(login_pw, hashsalt);

    // 비밀번호 체크
    const validPw = cur_pw === hashPassword;
    if (!validPw) return MESSAGE.UNMATCHED_PASSWORD;

    // user 정보를 담을 변수
    let userInfo = null;

    // 비밀번호 유효 시 유저 정보를 리턴하여 클라이언트로 전송
    if (validPw) {
      sqlId = user_reg_dv === "W" ? "Auth.getAuthUserInfo" : "Auth.getUserInfo";
      userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

      return userInfo.rows[0];
    } 
    
  } catch (err) {
    console.log(err);
  } finally {
    if (client) client.release();
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
      // 존재하지 않는 경우(최초 가입)
      // 비밀번호 해쉬화
      const { hashPassword, hashSalt } = await util.makeHashedPassword(login_pw);
      
      // 닉네임 랜덤 생성
      const nickname = util.makeRandomNickname();
      
      // 회원 등록
      sqlId = "Auth.join";
      const regditUser = await client.query(
        mapper.makeSql(sqlId, {
          login_id,
          hashPassword,
          hashSalt,
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
          image: userInfo.rows[0].image
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
  author_info,
  isAuthor,
}) => {
  const client = await pool.connect();
  let sqlId = isAuthor ? "Auth.getAuthUserInfo" : "Auth.getUserInfo";

  try {
    // 유저 정보 조회
    let userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

    // 인증 체크용 데이터 가져오기
    const { cur_pw, hashsalt } = { ...userInfo.rows[0] };

    const { hashPassword } = await util.makeHashedPassword(current_pw, hashsalt);

    let data;

    // 사용자가 입력한 현재 비밀번호가 DB에 있는 비밀번호와 일치하는지 확인
    if (cur_pw !== hashPassword) {
      return MESSAGE.UNMATCHED_PASSWORD;
    } else {
      // 닉네임, 비밀번호, 작가 소개글, 이미지 중 하나만 변경했을 때 빈 값으로 올 경우 기존에 있던 정보를 넣어주기 위한 조건 (논리 연산자 사용)
      user_nickname = user_nickname || userInfo.rows[0].user_nickname;
      image_file_name = image_file_name || userInfo.rows[0].image;
      author_info = author_info || userInfo.rows[0].author_info;

      let hashNewPw;

      // 비밀번호 해쉬화
      if (new_pw) {
        const { hashPassword } = await util.makeHashedPassword(new_pw, hashsalt);

        hashNewPw = hashPassword;
      }

      // 일치하는 경우 프로필 수정 실행
      /** 클라이언트에서 받은 isAuthor가 false일 경우(일반회원) */
      if (userInfo.rows[0].user_reg_dv === "W") {
        sqlId = "Auth.authorEditProfile";
        data = await client.query(
          mapper.makeSql(sqlId, {
            user_nickname,
            login_pw: new_pw ? hashNewPw : cur_pw,
            login_id,
            author_info: author_info,
            image: image_file_name,
          })
        );
      } else if (userInfo.rows[0].user_reg_dv === "G") {
        sqlId = "Auth.editProfile";
        data = await client.query(
          mapper.makeSql(sqlId, {
            user_nickname,
            login_pw: new_pw ? hashNewPw : cur_pw,
            login_id,
            image: image_file_name,
          })
        );
      }

      // 프로필 수정 성공 시 사용자가 입력한 닉네임 리턴
      // 프로필 수정 실패 경우와 타입으로 비교하기 위해 객체 형태로 전송
      if (data.rowCount === 1) {
        sqlId = isAuthor ? "Auth.getAuthUserInfo" : "Auth.getUserInfo";
        data = await client.query(mapper.makeSql(sqlId, { login_id }));
        return { 
          user_nickname: data.rows[0].user_nickname, 
          image: data.rows[0].image, 
          author_info: data.rows[0].author_info
        };
      } else {
        return MESSAGE.PATCH_PROFILE_FAILED;
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (client) client.release();
  }
};

// 작가로 승급 후 첫 로그인 시 작가 소개 업데이트
const authorFirstLogin = async ({ login_id, authorInfo }) => {
  const client = await pool.connect();
  let sqlId = "Auth.authorFirstLogin";

  try {
    // 작가 소개 업데이트 및 작가 권한 첫 로그인 여부 변경(Y => N)
    const data = await client.query(
      mapper.makeSql(sqlId, { login_id, authorInfo })
    );

    // 업데이트 성공 시
    if (data.rowCount === 1) {
		sqlId = "Auth.getAuthUserInfo";
		const userInfo = await client.query(mapper.makeSql(sqlId, { login_id }));

		return { author_first_login: userInfo.rows[0].author_first_login, author_info: userInfo.rows[0].author_info };

    // 업데이트 실패 시
    } else {
      return MESSAGE.PATCH_FAILED;
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
  authorFirstLogin,
};