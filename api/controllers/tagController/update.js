const Tag = require("../../models/Tag");
const utilsURL = require("../../utils/getURL");

// UPDATE BY ID async await
const tags_update_tag = async (req, res, next) => {
  const id = req.params.id;
  const updateObj = req.body;
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const updatedTag = await Tag.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
    if (!updatedTag) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Id" });
    }
    // json api data
    const data = {
      id: updatedTag._id,
      type: "tag",
      attributes: {
        id: updatedTag._id,
        name: updatedTag.name,
      },
      links: { self: fullUrl },
    };
    const meta = { type: "PATCH", message: "Tag updated" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  tags_update_tag,
};
