const pool = require("../../lib/dbConnPool");
const mapper = require("../../sql");

const postNovel = async ({
  title,
  content,
  created_user,
  genre_1,
  genre_2,
  keyword_1,
  keyword_2,
  keyword_3
}) => {
	const client = await pool.connect();

	const sqlId = "Novel.postNovel";
	// console.log(user_id, 1111);

  genre_2 = genre_2 === undefined ? null : genre_2;
  keyword_2 = keyword_2 ===  undefined ? null : keyword_2;
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
        keyword_3
			})
		);

		// 항상 콘솔로 확인 후에 리턴하기
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

module.exports = {
  postNovel
};