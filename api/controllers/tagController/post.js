const Tag = require("../../models/Tag");
const utilsURL = require("../../utils/getURL");

// CREATE CREATOR async await
const tags_create_tag = async (req, res, next) => {
  const tag = new Tag(req.body);
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const savedTag = await tag.save();
    // json api data
    const data = {
      id: savedTag._id,
      type: "tag",
      attributes: {
        id: savedTag._id,
        name: savedTag.name,
      },
      links: { self: fullUrl + "/" + savedTag._id },
    };
    const meta = { type: "POST", message: "Created tag successfully" };
    // response json
    res.status(201).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  tags_create_tag,
};
