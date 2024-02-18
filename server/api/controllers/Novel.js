const { Router } = require("express");
const router = Router();

const svc = require("../services/NovelService");
const { parsingFormData } = require("../../common/util");
const { fileUpload } = require("../../common/controller");
const { MESSAGE } = require("../../common/message");

// 완성 소설 조회
const getNovels = async (req, res, next) => {
  try {
    const data = await svc.getNovels({ ...req.query });
    res.send(data.rows);
    
  } catch (err) {
    console.log(err);
  }
};

// 미완성 소설 조회
const getIncompleteNovels = async (req, res, next) => {
  try {
    const data = await svc.getIncompleteNovels({ ...req.query });
    res.send(data.rows);

  } catch (err) {
    console.log(err);
  }
};

// 메인 소설 조회
const getMainNovel = async (req, res, next) => {
  try {
    const data = await svc.getMainNovel({ ...req.query });

    if (data.rowCount !== 0) {
      res.send(data.rows);
    }
  } catch (err) {
    console.log(err);
  }
};

// 찜한 완성 소설 조회
const getPickNovels = async (req, res, next) => {
  try {
    const data = await svc.getPickNovels({ ...req.query });

    if (data.rowCount !== 0) {
      res.send(data);
    }
  } catch (err) {
    console.log(err);
  }
};

// 찜한 소설 조회
const getPickIncompleteNovels = async (req, res, next) => {
  try {
    const data = await svc.getPickIncompleteNovels({ ...req.query });

    if (data.rowCount !== 0) {
      res.send(data);
    }
  } catch (err) {
    console.log(err);
  }
};

// 작가에 따른 미완성 소설 조회
const getAuthorNovel = async (req, res, next) => {
  try {
    const data = await svc.getAuthorNovel({ ...req.query });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

// 서브 소설 조회
const getSubNovel = async (req, res, next) => {
  try {
    const data = await svc.getSubNovel({ ...req.query });
    res.send(data.rows);
  } catch (err) {
    console.log(err);
  }
};

// 완성 소설 보기
const getCompleteNovel = async (req, res, next) => {
  try {
    const data = await svc.getCompleteNovel({ ...req.query });
    if (data.rowCount !== 0) {
      res.send(data.rows);
    }
  } catch (err) {
    console.log(err);
  }
};

// 서브 소설 등록
const postSubNovel = async (req, res, next) => {
  try {
    const data = await svc.postSubNovel({ ...req.body });

    if (data.rowCount === 1) {
      res.send(MESSAGE.POST_SUCCEED);
    } else if (data.rowCount === 0) {
      res.send(MESSAGE.POST_FAILED);
    }
  } catch (err) {
    console.log(err);
  }
};

// 메인 소설 등록
const postMainNovel = async (req, res, next) => {
  try {
    const data = await svc.postMainNovel({ ...req.body });

    if (data.rowCount === 1) {
      res.send(MESSAGE.POST_SUCCEED);
    } else if (data.rowCount === 0) {
      res.send(MESSAGE.POST_FAILED);
    }
  } catch (err) {
    console.log(err);
  }
};

// 소설 찜 기능
const postPickNovel = async (req, res, next) => {
  try {
    const data = await svc.postPickNovel({ ...req.body });

    if (data.rowCount === 1) {
      res.send(MESSAGE.PICK_SUCCEED);
    } else if (data.rowCount === 0) {
      res.send(MESSAGE.PICK_FAILED);
    }
  } catch (err) {
    console.log(err);
  }
};

// 소설 찜 해제 기능
const deletePickNovel = async (req, res, next) => {
  try {
    const data = await svc.deletePickNovel({ ...req.body });

    if (data.rowCount === 1) {
      res.send(MESSAGE.UNPICK_SUCCEED);
    } else if (data.rowCount === 0) {
      res.send(MESSAGE.UNPICK_FAILED);
    }
  } catch (err) {
    console.log(err);
  }
};

// 서브소설 좋아요 기능
const postLikeSubNovel = async (req, res, next) => {
  try {
    const data = await svc.postLikeSubNovel({ ...req.body });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

// 서브 소설 좋아요 해제 기능
const deleteLikeSubNovel = async (req, res, next) => {
  try {
    const data = await svc.deleteLikeSubNovel({ ...req.body });

    if (data.rowCount === 1) {
      res.send(MESSAGE.UNLIKE_SUCCEED);
    } else if (data.rowCount === 0) {
      res.send(MESSAGE.UNLIKE_FAILED);
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * 완성 소설 조회
 */
router.get("/getNovels", getNovels);

/**
 * 미완성 소설 조회
 */
router.get("/getIncompleteNovels", getIncompleteNovels);

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
 * 메인 소설 등록
 */
router.post("/postMainNovel", postMainNovel);

/**
 * 서브 소설 등록
 */
router.post("/postSubNovel", parsingFormData, fileUpload, postSubNovel);

/**
 * 찜한 완성 소설 가져오기
 */
router.get("/getPickNovels", getPickNovels);

/**
 * 찜한 미완성 소설 가져오기
 */
router.get("/getPickIncompleteNovels", getPickIncompleteNovels);

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
