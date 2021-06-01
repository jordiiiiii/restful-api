const User = require("../../models/Creator");
const utilsURL = require("../../utils/getURL");

// GET BY ID async await
const users_get_user = async (req, res, next) => {
  const id = req.params.id;
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const foundUser = await User.findById(id).select("_id name");
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
        name: foundUser.name,
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
};
