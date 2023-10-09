const { Router } = require("express");
const router = Router();

router.use("/api/auth", require("./controllers/Auth"));

module.exports = router;