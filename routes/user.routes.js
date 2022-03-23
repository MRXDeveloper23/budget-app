const router = require("express").Router();

const {
  createUser,
  getUser,
} = require("../controllers/user");

router.post("/", (req, res) => createUser(req, res));
router.get("/", (req, res) => getUser(req, res));
module.exports = router;
