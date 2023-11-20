const { Router } = require("express");
const router = Router();

const svc = require("../services/NovelService");

// 완성 소설 조회 함수
const getNovel = async (req, res, next) => {
	// console.log(req.query, 123456);
	try {
		const data = await svc.getNovel({ ...req.query });
		// console.log(data,8888);
		if (data.rowCount !== 0) {
			res.send(data.rows);
			// console.log(data.rows[3].genre_1, 14)
		}
	} catch (err) {
		console.log(err);
	}
};

// 메인 소설 조회 함수
const getMainNovel = async (req, res, next) => {
	console.log(req.query, 123456);
	try {
		const data = await svc.getMainNovel({ ...req.query });
		if (data.rowCount !== 0) {
			res.send(data.rows);
		}
	} catch (err) {
		console.log(err);
	}
};

// 작가에 따른 미완성 소설 조회 함수
const getAuthorNovel = async (req, res, next) => {
	try {
		const data = await svc.getAuthorNovel({ ...req.query });

		if (data.rowCount !== 0) {
			res.send(data.rows);
		}
	} catch (err) {
		console.log(err);
	}
};

// 서브 소설 조회 함수
const getSubNovel = async (req, res, next) => {
	try {
		const data = await svc.getSubNovel({ ...req.query });
		res.send(data.rows);
	} catch (err) {
		console.log(err);
	}
};

// 완성 소설 보기 함수

const getCompleteNovel = async (req, res, next) => {
	try {
		const data = await svc.getCompleteNovel({ ...req.query });
		// console.log(data,111);
		if (data.rowCount !== 0) {
			res.send(data.rows);
			// console.log(data.rows,75)
		}
	} catch (err) {
		console.log(err);
	}
};

// 소설 등록 함수
const postNovel = async (req, res, next) => {
	try {
		const data = await svc.postNovel({ ...req.body });
		if (data.rowCount === 1) {
			res.send(true);
		} else if (data.rowCount === 0) {
			res.send(false);
		}
	} catch (err) {
		console.log(err);
	}
};

// 서브 소설 등록 함수
const postSubNovel = async (req, res, next) => {
	try {
		const data = await svc.postSubNovel({ ...req.body });
		if (data.rowCount === 1) {
			// console.log(true);
			res.send(true);
		} else if (data.rowCount === 0) {
			res.send(false);
		}
	} catch (err) {
		console.log(err);
	}
};

// 메인 소설 등록 함수
const postMainNovel = async (req, res, next) => {
	console.log(req.body, 103);
	try {
		const data = await svc.postMainNovel({ ...req.body });
		if (data.rowCount === 1) {
			// console.log(true);
			res.send(true);
		} else if (data.rowCount === 0) {
			res.send(false);
		}
	} catch (err) {
		console.log(err);
	}
};

// 소설 찜 기능 함수
const postPickNovel = async (req, res, next) => {
	try {
		const data = await svc.postPickNovel({ ...req.body });
		if (data.rowCount === 1) {
			res.send("찜 성공");
		} else if (data.rowCount === 0) {
			res.send("찜 실패");
		}
	} catch (err) {
		console.log(err);
	}
};

// 소설 찜 해제 기능 함수
const deletePickNovel = async (req, res, next) => {
	try {
		const data = await svc.deletePickNovel({ ...req.body });
		if (data.rowCount === 1) {
      // console.log(data,136)
			res.send("찜 해제 성공");
		} 
    else if (data.rowCount === 0) {
			res.send("찜 해제 실패");
		}
	} catch (err) {
		console.log(err);
	}
};

// 서브소설 좋아요 기능 함수
const postLikeSubNovel = async (req, res, next) => {
	try {
		const data = await svc.postLikeSubNovel({ ...req.body });
		if (data.rowCount === 1) {
			res.send("좋아요 성공");
		} else if (data.rowCount === 0) {
			res.send("좋아요 실패");
		}
	} catch (err) {
		console.log(err);
	}
};


// 서브소설 좋아요 해제 기능 함수
const deleteLikeSubNovel = async (req, res, next) => {
	try {
		const data = await svc.deleteLikeSubNovel({ ...req.body });
		if (data.rowCount === 1) {
			res.send("좋아요 해제 성공");
		} else if (data.rowCount === 0) {
			res.send("좋아요 해제 실패");
		}
	} catch (err) {
		console.log(err);
	}
};


/**
 * 완성 소설 조회
 */
router.get("/getNovel", getNovel);

/**
 * 메인 소설 조회
 */
router.get("/getMainNovel", getMainNovel);

/**
 * 서브 소설 조회
 */
router.get("/getSubNovel", getSubNovel);

/**
 * 작가에 따른 미완 소설 조회
 */
router.get("/getAuthorNovel", getAuthorNovel);

/**
 * 완성 소설 보기
 */
router.get("/getCompleteNovel", getCompleteNovel);

/**
 * 소설 등록
 */
router.post("/postNovel", postNovel);

/**
 * 서브 소설 등록
 */
router.post("/postSubNovel", postSubNovel);

/**
 * 메인 소설 등록
 */
router.post("/postMainNovel", postMainNovel);

/**
 * 소설 찜 기능
 */
router.post("/postPickNovel", postPickNovel);

/**
 * 소설 찜 해제 기능
 */
router.delete("/deletePickNovel", deletePickNovel);

/**
 * 서브소설 좋아요 기능
 */
router.post("/postLikeSubNovel", postLikeSubNovel);

/**
 * 서브소설 좋아요 해제 기능
 */
router.delete("/deleteLikeSubNovel", deleteLikeSubNovel);

module.exports = router;
