const Creator = require("../../models/Creator");
const utilsURL = require("../../utils/getURL");

// GET BY ID async await
const creators_get_creator = async (req, res, next) => {
  const id = req.params.id;
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const foundCreator = await Creator.findById(id).select(
      "_id name surnames position"
    );
    if (!foundCreator) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Id" });
    }
    // json api data
    const data = {
      _id: foundCreator._id,
      type: "tag",
      attributes: {
        name: foundCreator.name,
        surnames: foundCreator.surnames,
        position: foundCreator.position,
      },
      links: { self: fullUrl },
    };
    const meta = { type: "GET", message: "Creator found" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  creators_get_creator,
};
