const User = require("../../models/Creator");
const utilsURL = require("../../utils/getURL");

// GET ALL async await
const users_get_all = async (req, res, next) => {
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const foundUsers = await User.find().select("_id name").sort({ name: 1 });
    const count = foundUsers.length;
    // json api data
    const data = foundUsers.map((user) => {
      return {
        id: user._id,
        type: "user",
        attributes: {
          id: user._id,
          name: user.name,
        },
        links: { self: fullUrl + "/" + user._id },
      };
    });
    const meta = { count, type: "GET", message: "Users found" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  users_get_all,
};
