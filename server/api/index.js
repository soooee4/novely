const { Router } = require("express");
const router = Router();

router.use("/api/auth", require("./controllers/Auth"));
router.use("/api/novel", require("./controllers/Novel"));


module.exports = router;