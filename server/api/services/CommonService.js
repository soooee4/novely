const pool = require("../../lib/dbConnPool");
const mapper = require("../../sql");

// 장르 태그 조회 함수
const getGenre = async () => {
	const client = await pool.connect();
	const sqlId = "Common.getGenre";
	
	try {
		// console.log(11111)
		const data = await client.query(
			mapper.makeSql(sqlId, {}));
		  // console.log(data,123);  
		  return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 태그 전체 조회 함수
const getTag = async () => {
	const client = await pool.connect();
	const sqlId = "Common.getTag";
	
	try {
		const data = await client.query(
			mapper.makeSql(sqlId, {}));
		  return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};


module.exports = {
  getGenre,
  getTag
};