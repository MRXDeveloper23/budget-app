require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`;
const cors = require("cors");
const Users = require("./models/users");
const userRoutes = require("./routes/user.routes");
const accountRoutes = require("./routes/account.routes");

mongoose.connect(
  dbUrl,
  () => console.log("Connected to the database"),
  (err) => console.log(err)
);
let refreshTokens = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoutes);
app.use("/user/account", accountRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

app.get("/user", authenticateToken, (req, res) => {
  res.json(req.user);
});
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken))
    return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const accessToken = generateAccessToken({
        username: user.username,
      });
      res.json({ accessToken });
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const user = Users.find(
    (user) =>
      user.username === username &&
      user.password === password
  );
  if (user) {
    const accessToken = generateAccessToken(
      user,
      process.env.ACCESS_TOKEN_SECRET
    );
    const refreshToken = jwt.sign(
      user,
      process.env.REFRESH_TOKEN_SECRET
    );
    refreshTokens.push(refreshToken);
    res.status(200).json({ accessToken, refreshToken });
  } else {
    res.status(400).json({
      message: "Username or password incorrect!",
    });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) return res.sendStatus(403);
      console.log(user);
      req.user = user;
      next();
    }
  );
}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.body.token
  );
  res
    .json({ message: "Successfully logged out" })
    .sendStatus(204);
});
