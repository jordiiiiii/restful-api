const Creator = require("../../models/Creator");
const utilsURL = require("../../utils/getURL");

// CREATE CREATOR async await
const creators_create_creator = async (req, res, next) => {
  const creator = new Creator(req.body);
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const savedCreator = await creator.save();
    // json api data
    const data = {
      id: savedCreator._id,
      type: "creator",
      attributes: {
        id: savedCreator._id,
        name: savedCreator.name,
        surnames: savedCreator.surnames,
        position: savedCreator.position,
      },
      links: { self: fullUrl + "/" + savedCreator._id },
    };
    const meta = { type: "POST", message: "Created creator successfully" };
    // response json
    res.status(201).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  creators_create_creator,
};
