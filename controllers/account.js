const Users = require("../models/users");
const Account = require("../models/accounts");

async function getAccount(req, res) {
  return await Users.findById(
    req.params.id,
    (err, data) => {
      if (err) {
        res.status(400).json({ message: `Error: ${err}` });
      }
      res.status(200).json(data.populate("account"));
    }
  );
}
async function createAccount(req, res) {
  let newAccount = new Account(req.body);
  console.log(newAccount);
  try {
    await Users.findByIdAndUpdate(req.body.id, {
      $push: {
        accounts: {
          type: newAccount.type,
          balance: newAccount.balance,
          currency: newAccount.currency,
        },
      },
    });
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
  return res
    .status(200)
    .json({ message: "Account successfully added" });
}
async function updateAccount(req, res) {}
async function deleteAccount(req, res) {}

module.exports = {
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
};
