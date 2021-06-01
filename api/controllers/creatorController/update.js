const Creator = require("../../models/Creator");
const utilsURL = require("../../utils/getURL");

// UPDATE BY ID async await
const creators_update_creator = async (req, res, next) => {
  const id = req.params.id;
  const updateObj = req.body;
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const updatedCreator = await Creator.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
    if (!updatedCreator) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Id" });
    }
    // json api data
    const data = {
      id: updatedCreator._id,
      type: "creator",
      attributes: {
        id: updatedCreator._id,
        name: updatedCreator.name,
        surnames: updatedCreator.surnames,
        position: updatedCreator.position,
      },
      links: { self: fullUrl },
    };
    const meta = { type: "PATCH", message: "Creator updated" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  creators_update_creator,
};
