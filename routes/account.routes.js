const router = require("express").Router();
const {
  createAccount,
  updateAccount,
  getAccount,
  deleteAccount,
} = require("../controllers/account");

router.get("/:id", (req, res) => getAccount(req, res));
router.post("/", (req, res) => createAccount(req, res));
router.put("/:id", (req, res) => updateAccount(req, res));
router.delete("/:id", (req, res) =>
  deleteAccount(req, res)
);

module.exports = router;
