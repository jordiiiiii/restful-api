const User = require("../../models/User");
const utilsURL = require("../../utils/getURL");
const utilsERR = require("../../utils/handleERR");
const utilsTOKEN = require("../../utils/addTOKEN");

// CREATE USER async await
const signup_post = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    const user = await User.create({ userName, email, password });
    const token = utilsTOKEN.createToken(user._id);
    const data = {
      id: user._id,
      type: "auth",
      attributes: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        admin: user.admin,
        readPostIds: [],
        token,
      },
      links: { self: fullUrl + "/" + user._id },
    };
    const meta = { type: "POST", message: "User created" };
    res.status(201).json({ data, meta });
  } catch (err) {
    const errors = utilsERR.handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = {
  signup_post,
};

// // CREATE USER async await
// module.exports.signup_post = async (req, res, next) => {
//   const { email, password } = req.body;
//
//   try {
//     const user = await User.create({ email, password });
//     const token = utilsTOKEN.createToken(user._id);
//     // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
//     console.log(user);
//     res.status(201).json({ user: user._id, message: "User created", token });
//   } catch (err) {
//     const errors = utilsERR.handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };
