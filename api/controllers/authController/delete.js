const User = require("../../models/User");

// DELETE BY ID async await
const user_delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    // mongoose
    const removedUser = await User.findByIdAndDelete(id);
    if (!removedUser) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Id" });
    }
    // json api data
    const data = {
      id: removedUser._id,
      type: "user",
    };
    const meta = { type: "DELETE", message: "User deleted" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  user_delete,
};
