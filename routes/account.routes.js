const express = require("express");
const router = require("express").Router();
const {
  createAccount,
  updateAccount,
  getAccount,
  deleteAccount,
} = require("../controllers/accounts");

router.get("/:id", (req, res) => getAccount);
router.post("/", (req, res) => createAccount);
router.put("/:id", (req, res) => updateAccount);
router.delete("/:id", (req, res) => deleteAccount);

module.exports = router;
