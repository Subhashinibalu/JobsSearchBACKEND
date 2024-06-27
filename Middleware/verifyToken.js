import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.params.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    req.user = user;
    next();
  });
};
