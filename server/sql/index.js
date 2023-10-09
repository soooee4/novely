const mybatis = require("mybatis-mapper");

mybatis.createMapper(["sql/mappers/Auth.xml"]);
// mappers 안에 있는 xml 파일들 목록은 전부 이 배열 안에 집어넣어야 함

// console에 쿼리가 어떻게 실행되는지 개발자가 보기 위해서 만든 기능일 뿐, 이해x
const makeSql = (sqlId, params, nolog) => {
  const sqlIds = sqlId.split(".");

  if (sqlIds.length != 2) throw Error(`invalid sql id(${sqlId})`);

  const sql = mybatis.getStatement(sqlIds[0], sqlIds[1], params);
  // sqlIds[0]는 namespace(예약어), [1]은 id(예약어)
  //   if (!nolog) apiLog(sourcePath, "makeSql", `sqlId : ${sqlId}\n${sql}`);
  // apiLog(sourcePath, 'makeSql', `sqlId : ${sqlId}`);

  return sql;
};

module.exports = {
  mybatis,
  makeSql,
};
