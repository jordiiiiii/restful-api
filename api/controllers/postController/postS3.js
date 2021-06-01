const Post = require("../../models/Post");
const Creator = require("../../models/Creator");
const utilsURL = require("../../utils/getURL");
const utilsPostObj = require("../../utils/postJSON");

// CREATE POST async await
const posts_create_post_S3 = async (req, res, next) => {
  let post = new Post(req.body);
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const creator = await Creator.findById(req.body.creator);
    // check if creator exist
    if (!creator) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided ID" });
    }
    // mongoose
    const savedPost = await post.save();
    // json api data
    let data = utilsPostObj.data(savedPost, fullUrl);
    const meta = { type: "POST", message: "Created post successfully" };
    // response json
    res.status(201).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  posts_create_post_S3,
};
