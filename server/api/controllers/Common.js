const { Router } = require("express");
const router = Router();

const svc = require("../services/CommonService");

// 장르 태그 조회 함수
const getGenre = async (req, res, next) => {
  try {
    const data = await svc.getGenre({ ...req.query });
    res.send(data.rows);
  } catch (err) {
    console.log(err);
  }
};

// 전체 태그 조회 함수
const getTag = async (req, res, next) => {
  try {
    const data = await svc.getTag({ ...req.query });
    res.send(data.rows);
  } catch (err) {
    console.log(err);
  }
};

/**
 * 장르 태그 조회
 */
router.get("/genre", getGenre);

/**
 * 전체 태그 조회
 */
router.get("/tag", getTag);

module.exports = router;