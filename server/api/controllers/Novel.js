const { Router } = require("express");
const router = Router();

const svc = require("../services/NovelService");

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
 * 소설 등록
 */
router.post("/postNovel", postNovel);

module.exports = router;