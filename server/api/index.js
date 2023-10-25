const { Router } = require("express");
const router = Router();

// router.use(url, require(파일 경로));  url 앞에 붙는 주소는 server.js에 정의되어있음
router.use("/api/auth", require("./controllers/Auth"));
router.use("/api/novel", require("./controllers/Novel"));
router.use("/api/common", require("./controllers/Common"));

module.exports = router;