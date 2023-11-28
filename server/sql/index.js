const mybatis = require("mybatis-mapper");

// mappers 안에 있는 xml 파일들 목록
mybatis.createMapper([
  "sql/mappers/Auth.xml",
  "sql/mappers/Novel.xml",
  "sql/mappers/Common.xml",
  "sql/mappers/Schedule.xml"
]);

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