const Creator = require("../../models/Creator");

// DELETE BY ID async await
const creators_delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    // mongoose
    const removedCreator = await Creator.findByIdAndDelete(id);
    if (!removedCreator) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Id" });
    }
    // json api data
    const data = {
      id: removedCreator._id,
      type: "creator",
    };
    const meta = { type: "DELETE", message: "Creator deleted" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  creators_delete,
};
