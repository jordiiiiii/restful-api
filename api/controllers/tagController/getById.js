const Tag = require("../../models/Tag");
const Post = require("../../models/Post");
const utilsURL = require("../../utils/getURL");

// GET BY ID async await
const tags_get_tag = async (req, res, next) => {
  const id = req.params.id;
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const foundTag = await Tag.findById(id).select("_id name");
    if (!foundTag) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Id" });
    }
    // mongoose
    const foundPostRelations = await Post.find({
      tag: id,
      available: true,
    });
    // mongoose
    const foundTags = await Tag.find().select("_id name");

    // json api data
    const data = {
      id: foundTag._id,
      type: "tag",
      attributes: {
        id: foundTag._id,
        name: foundTag.name,
      },
      relationships: {
        posts: {
          data: foundPostRelations.map((post) => {
            return { id: post._id, type: "post" };
          }),
        },
      },
      links: { self: fullUrl },
    };
    const includedPost = foundPostRelations.map((post) => {
      return {
        id: post._id,
        type: "post",
        attributes: {
          id: post._id,
          title: post.title,
          snippet: post.snippet,
          body: post.body,
          imageUrl: post.imageUrl,
        },
        relationships: {
          tags: {
            data: post.tag.map((tag) => {
              return { id: tag._id, type: "tag" };
            }),
          },
        },
      };
    });
    const includedTags = foundTags.map((tag) => {
      return {
        id: tag._id,
        type: "tag",
        attributes: {
          id: tag._id,
          name: tag.name,
        },
      };
    });
    const included = includedPost.concat(includedTags);

    const meta = { type: "GET", message: "Tag found" };
    // response json
    res.status(200).json({ data, included, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  tags_get_tag,
};
