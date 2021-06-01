const User = require("../../models/User");
// const utilsURL = require("../../utils/getURL");
const utilsERR = require("../../utils/handleERR");
const utilsTOKEN = require("../../utils/addTOKEN");

// LOGIN USER async await
const login_post = async (req, res, next) => {
  const { email, password } = req.body;
  // const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    const user = await User.login(email, password);
    const token = utilsTOKEN.createToken(user._id);
    // const data = {
    //   id: user._id,
    //   type: "auth",
    //   attributes: {
    //     id: user._id,
    //     email: user.email,
    //     userName: user.userName,
    //     admin: user.admin,
    //     readPostIds: user.readPostIds,
    //     token,
    //   },
    //   links: { self: fullUrl + "/" + user._id },
    // };
    // const meta = { type: "POST", message: "User logged" };
    // res.status(200).json({ data, meta });
    res.status(200).json({ token });
  } catch (err) {
    const errors = utilsERR.handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports = {
  login_post,
};

// // LOGIN USER async await
// module.exports.login_post = async (req, res, next) => {
//   const { email, password } = req.body;
//
//   try {
//     const user = await User.login(email, password);
//     const token = utilsTOKEN.createToken(user._id);
//     // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.status(200).json({ user: user._id, message: "User logged", token });
//   } catch (err) {
//     const errors = utilsERR.handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };
