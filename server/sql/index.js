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

  return sql;
};

module.exports = {
  mybatis,
  makeSql,
};