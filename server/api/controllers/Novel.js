const { Router } = require("express");
const router = Router();

const svc = require("../services/NovelService");

// 소설 조회 함수
const getNovel = async (req, res, next) => {
  // console.log(req.query, 123456);
  try {
    const data = await svc.getNovel({ ...req.query });
    // console.log(data,8888);
    if (data.rowCount !== 0) {
      res.send(data.rows);
    } 
  } catch (err) {
    console.log(err);
  }
};

// 서브 소설 조회 함수
const getSubNovel = async (req, res, next) => {
  // console.log(req.query, 123456);
  try {
    const data = await svc.getSubNovel({ ...req.query });
    // console.log(data,111);
    if (data.rowCount !== 0) {
      res.send(data.rows);
    } 
  } catch (err) {
    console.log(err);
  }
};

// 소설 등록 함수
const postNovel = async (req, res, next) => {
  // console.log(req.body, 123456);
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

/**
 * 소설 조회
 */
router.get("/getNovel", getNovel);

/**
 * 서브 소설 조회
 */
router.get("/getSubNovel", getSubNovel);

/**
 * 소설 등록
 */
router.post("/postNovel", postNovel);

module.exports = router;