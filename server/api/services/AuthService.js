const pool = require("../../lib/dbConnPool");

const mapper = require("../../sql");

const login = async ({ login_id, login_pw }) => {
  // 서버와 pg와 연결하는 코드, 기본적으로 들어가는 코드
  const client = await pool.connect();

  // sqlId = "namespace.Id" (해당 namespace에 매칭되는 id의 쿼리를 실행하는 코드)
  const sqlId = "Auth.login";

  try {
    console.log(login_id, login_pw, 77777);

    // client.query: pg라이브러리에서 제공하는 메서드로 SQL쿼리를 실행하고 그 결과를 반환함
    const data = await client.query(
      mapper.makeSql(sqlId, { login_id, login_pw })
    );

    // 데이터가 어떻게 넘어오는지 확인하기 위해서 콘솔 찍어서 확인
    // console.log(data.rowCount, 333);

    return data.rowCount;
  } catch (err) {
    console.log(err);
  } finally {
    // try문이 제대로 실행되었을 경우에만 finally까지 옴.
    // 만약 try문이 끝났는데도 client가 연결되어 있다면 연결 끊어라
    if (client) client.release();
  }
};

module.exports = {
  login
};