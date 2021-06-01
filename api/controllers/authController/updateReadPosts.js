const User = require("../../models/User");
const utilsURL = require("../../utils/getURL");

// UPDATE READ POSTS BY ID async await
const users_update_read_post_user = async (req, res, next) => {
  const id = req.params.id;
  const updateObj = { $push: req.body };
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const updatedUser = await User.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Id" });
    }
    // json api data
    const data = {
      id: updatedUser._id,
      type: "auth",
      attributes: {
        id: updatedUser._id,
        email: updatedUser.email,
        userName: updatedUser.userName,
        admin: updatedUser.admin,
        readPostIds: updatedUser.readPostIds,
      },
      links: { self: fullUrl },
    };
    const meta = { type: "PATCH", message: "User updated" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  users_update_read_post_user,
};
