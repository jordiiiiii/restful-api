const Tag = require("../../models/Tag");

// DELETE BY ID async await
const tags_delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    // mongoose
    const removedTag = await Tag.findByIdAndDelete(id);
    if (!removedTag) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Id" });
    }
    // json api data
    const data = {
      id: removedTag._id,
      type: "tag",
    };
    const meta = { type: "DELETE", message: "Tag deleted" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  tags_delete,
};
