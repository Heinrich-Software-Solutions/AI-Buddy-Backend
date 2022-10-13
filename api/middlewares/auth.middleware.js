// Modules

const { tokens } = require("../../config");

// Middleware

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    return res.json({ msg: "api token not found" });
  }

  const [type, token] = authorization.split(" ");

  if (!token) {
    res.status(401);
    return res.json({ msg: "api token not found" });
  }

  if (type !== "Bearer") {
    res.status(401);
    return res.json({ msg: "api token malformed" });
  }

  const search = tokens.find((x) => x.token === token);

  if (!search) {
    res.status(401);
    return res.json({ msg: "api token not valid", token });
  }

  req.requester = search;

  return next();
};
