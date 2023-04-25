import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const parseToken = (req, res, next) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWT, (err, data) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.body.email = data.email;
    console.log(data.email);
    // console.log(req.email);
    // console.log(req.body);
    next();
  });
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(">>> token", token);
  if (!token) {
    return res.status(401).send(createError(401, "You are not authenticated!"));
    // return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    console.log(req.cookies.access_token);
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).send(createError(403, "You are not authorized!"));
      // return next(createError(403, "You are not authorized!"));
    }
  });
};
