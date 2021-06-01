const Post = require("../../models/Post");
const utilsURL = require("../../utils/getURL");
const utilsPostObj = require("../../utils/postJSON");
const utilsPostIncTagObj = require("../../utils/postIncludedTagJSON");
// const utilsPostRelTagObj = require("../../utils/postRelationTagJSON");

// ADD TAGS IN POST BY ID async await
const posts_add_tags_post = async (req, res, next) => {
  const id = req.params.id;
  const updateObj = { $push: req.body };
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const updatedPost = await Post.findByIdAndUpdate(id, updateObj, {
      new: true,
    }).populate("creator tag");
    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided ID" });
    }
    // json api data
    let data = utilsPostObj.data(updatedPost, fullUrl);
    // // relationships tags in data if tag exist
    // const tags = utilsPostRelTagObj.tags(updatedPost, fullUrl);
    // if (updatedPost.tag) {
    //   data.relationships.tags = tags;
    // }
    // included
    const included = utilsPostIncTagObj.included(updatedPost);
    const meta = { type: "PATCH", message: "Post updated" };
    // response json
    res.status(200).json({ data, included, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  posts_add_tags_post,
};
