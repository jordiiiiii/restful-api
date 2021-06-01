const User = require("../../models/Creator");
const utilsURL = require("../../utils/getURL");

// CREATE CREATOR async await
const users_create_user = async (req, res, next) => {
  const user = new User(req.body);
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const savedUser = await user.save();
    // json api data
    const data = {
      id: savedUser._id,
      type: "user",
      attributes: {
        id: savedUser._id,
        name: savedUser.name,
      },
      links: { self: fullUrl + "/" + savedUser._id },
    };
    const meta = { type: "POST", message: "Created user successfully" };
    // response json
    res.status(201).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  users_create_user,
};
