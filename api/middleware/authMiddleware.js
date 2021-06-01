const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../../config");

// const checkAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//
//     // check json web token is verified
//     const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
//     req.userData = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Auth failed",
//     });
//   }
// };

const requireAuth = (req, res, next) => {
  // const token = req.cookies.jwt;// const token = req.body.token;
  // const token = req.headers.authorization.split(" ")[1];
  const token = req.headers.authorization;

  // check json web token is verified
  jwt.verify(token, config.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        message: err.message,
      });
    } else {
      let user = await User.findById(decodedToken.id);
      if (user) {
        if (user.admin) {
          req.userData = decodedToken;
          req.s3 = { id: config.S3_KEY_ID, secret: config.S3_KEY_SECRET };
          next();
        } else {
          req.userData = decodedToken;
          next();
        }
      } else {
        return res.status(401).json({
          message: "not user",
        });
      }
    }
  });
};

// check is Admin
const requireAuthAndIsAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  // check json web token is verified
  jwt.verify(token, config.JWT_SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return res.status(401).json({
        message: err.message,
      });
    } else {
      let user = await User.findById(decodedToken.id);
      if (user.admin) {
        req.userData = decodedToken;
        next();
      } else {
        return res.status(401).json({
          message: "not admin",
        });
      }
    }
  });
};

// const checkUser = (req, res, next) => {
//   const token = req.cookies["token"];
//   console.log("yoyo1");
//   console.log(token);
//   if (token) {
//     console.log("yoyo2");
//     jwt.verify(token, config.JWT_SECRET_KEY, async (err, decodedToken) => {
//       if (err) {
//         console.log("yoyo3");
//         res.locals.user = null;
//         next();
//       } else {
//         console.log("yoyo4");
//         let user = await User.findById(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     console.log("yoyo5");
//     res.locals.user = null;
//     next();
//   }
// };

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies["token"];
  console.log("yoyo1");
  console.log(token);
  if (token) {
    console.log("yoyo2");
    jwt.verify(token, config.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log("yoyo3");
        res.locals.user = null;
        next();
      } else {
        console.log("yoyo4");
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log("yoyo5");
    res.locals.user = null;
    next();
  }
};

// // backend i frontend together
// // check current user
// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, config.JWT_SECRET_KEY, async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         next();
//       } else {
//         let user = await User.findById(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

module.exports = { requireAuth, checkUser, requireAuthAndIsAdmin };
