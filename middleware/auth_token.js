const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const tokenReq = req.get("Authorization");
  if (!tokenReq) {
    const error = new Error("Invalid User");
    throw error;
  }
  const token = tokenReq.split(" ")[1];
  let verification;

  try {
    verification = jwt.verify(token, "superOnyango12342905#21@");
  } catch (err) {
    err.status = 401;
    throw err;
  }
  req.userId = verification.userId;
  next();
};
