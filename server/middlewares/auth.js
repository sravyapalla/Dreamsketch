import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  let token = null; 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  else if (req.headers.token) {
    token = req.headers.token;
  }
  
  else if (req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorised. Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default userAuth;
