const { Router } = require("express");
const router = Router();

const svc = require("../services/CommonService");

// 장르 태그 조회 함수
const getGenre = async (req, res, next) => {
  // console.log(req.query, 123456);
  try {
    const data = await svc.getGenre({ ...req.query });
    // console.log(data.rowCount,111);
    res.send(data.rows);
  } catch (err) {
    console.log(err);
  }
};

/**
 * 장르 태그 조회
 */
router.get("/genre", getGenre);

module.exports = router;