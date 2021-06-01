const User = require("../../models/User");
const utilsURL = require("../../utils/getURL");

// GET BY ID async await
const users_get_user = async (req, res, next) => {
  const id = req.params.id;
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const foundUser = await User.findById(id).select(
      "_id email userName admin readPostIds"
    );
    if (!foundUser) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Id" });
    }
    // json api data
    const data = {
      id: foundUser._id,
      type: "user",
      attributes: {
        id: foundUser._id,
        email: foundUser.email,
        userName: foundUser.userName,
        admin: foundUser.admin,
        readPostIds: foundUser.readPostIds,
      },
      links: { self: fullUrl },
    };
    const meta = { type: "GET", message: "User found" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

// GET BY ID async await NUXT
const users_get_user_nuxt = async (req, res, next) => {
  const idExpIat = req.userData;
  const s3_keys = req.s3;
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const foundUser = await User.findById(idExpIat.id).select(
      "_id email userName admin readPostIds"
    );
    if (!foundUser) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Id" });
    }
    // json api data
    const data = {
      id: foundUser._id,
      type: "user",
      attributes: {
        id: foundUser._id,
        email: foundUser.email,
        userName: foundUser.userName,
        admin: foundUser.admin,
        s3_keys,
        readPostIds: foundUser.readPostIds,
      },
      links: { self: fullUrl },
    };
    const meta = { type: "GET", message: "User found" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  users_get_user,
  users_get_user_nuxt,
};
