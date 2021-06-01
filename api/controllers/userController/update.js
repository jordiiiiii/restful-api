const User = require("../../models/Creator");
const utilsURL = require("../../utils/getURL");

// UPDATE BY ID async await
const users_update_user = async (req, res, next) => {
  const id = req.params.id;
  const updateObj = req.body;
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
      type: "user",
      attributes: {
        id: updatedUser._id,
        name: updatedUser.name,
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
  users_update_user,
};
