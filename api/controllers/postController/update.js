const Post = require("../../models/Post");
const utilsIMG = require("../../utils/removeIMG");
const utilsURL = require("../../utils/getURL");
const utilsPostObj = require("../../utils/postJSON");
const utilsPostIncTagObj = require("../../utils/postIncludedTagJSON");
// const utilsPostRelTagObj = require("../../utils/postRelationTagJSON");

// UPDATE BY ID async await
const posts_update_post = async (req, res, next) => {
  const id = req.params.id;
  const updateObj = req.body;
  const fullUrl = utilsURL.fullUrlFunction(req);

  if (req.file) {
    updateObj.imageUrl = req.file.path;
  }

  try {
    // mongoose
    const oldPost = await Post.findById(id).select("imageUrl");
    const updatedPost = await Post.findByIdAndUpdate(id, updateObj, {
      new: true,
    }).populate("creator tag");
    // delete old picture
    if (updatedPost) {
      if (req.file) {
        utilsIMG.deleteImage(oldPost.imageUrl);
      }
    }
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
  posts_update_post,
};
