const pool = require("../../lib/dbConnPool");
const mapper = require("../../sql");

// 완성 소설 조회 함수
const getNovel = async () => {
	const client = await pool.connect();

	const sqlId = "Novel.getNovel";
	// console.log(user_id, 1111);

  // genre_2 = genre_2 === undefined ? null : genre_2;
  // keyword_2 = keyword_2 ===  undefined ? null : keyword_2;
  // keyword_3 = keyword_3 === undefined ? null : keyword_3;

	try {
		// try문 안이 정상적으로 먼저 실행되고 있는지 확인
		// console.log(11111)
		const data = await client.query(
			mapper.makeSql(sqlId));

		// console.log(data,8888);  
    //  => 지금 여기서 콘솔을 찍었는데 콘솔에 이게 안나온다? 그럼 위에거가 제대로 실행되는지(트라이 문 안에가 실행이 되고있는건지, 만약 아래 catch문이 실행되는 건지 콘솔에서 확인)
		return data;
	} catch (err) {
		// 위와 같이 혹시 try 후 뭔가 에러가 발생한건지 확인
		// console.log(222222)
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 메인 소설 조회 함수
const getMainNovel = async () => {
	const client = await pool.connect();

	const sqlId = "Novel.getMainNovel";
	// console.log(user_id, 1111);

  // genre_2 = genre_2 === undefined ? null : genre_2;
  // keyword_2 = keyword_2 ===  undefined ? null : keyword_2;
  // keyword_3 = keyword_3 === undefined ? null : keyword_3;

	try {
		// try문 안이 정상적으로 먼저 실행되고 있는지 확인
		// console.log(11111)
		const data = await client.query(
			mapper.makeSql(sqlId));

		console.log(data,8888);  
    //  => 지금 여기서 콘솔을 찍었는데 콘솔에 이게 안나온다? 그럼 위에거가 제대로 실행되는지(트라이 문 안에가 실행이 되고있는건지, 만약 아래 catch문이 실행되는 건지 콘솔에서 확인)
		return data;
	} catch (err) {
		// 위와 같이 혹시 try 후 뭔가 에러가 발생한건지 확인
		// console.log(222222)
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 서브 소설 조회 함수
const getSubNovel = async ({ main_novel_seqno }) => {
	const client = await pool.connect();

	const sqlId = "Novel.getSubNovel";
	
	try {

		// console.log(11111)
		const data = await client.query(
			mapper.makeSql(sqlId, {
        main_novel_seqno
      }));
		// console.log(data,123);  
		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};

// 소설 등록 함수
const postNovel = async ({
  title,
  content,
  created_user,
  genre_1,
  genre_2,
  keyword_1,
  keyword_2,
  keyword_3,
  description
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
        keyword_3,
        description
			})
		);
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	} finally {
		if (client) client.release();
	}
};


module.exports = {
  getNovel,
  getSubNovel,
  postNovel,
  getMainNovel
};