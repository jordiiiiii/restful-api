const Post = require("../../models/Post");

// DELETE BY ID async await
const posts_delete_S3 = async (req, res, next) => {
  const id = req.params.id;

  try {
    // mongoose
    const removedPost = await Post.findByIdAndDelete(id);
    if (!removedPost) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided ID" });
    }
    // json api data
    const data = {
      id: removedPost._id,
      type: "post",
    };
    const meta = { type: "DELETE", message: "Post deleted" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  posts_delete_S3,
};
