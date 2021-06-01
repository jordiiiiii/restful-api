const Tag = require("../../models/Tag");
const Post = require("../../models/Post");
const utilsURL = require("../../utils/getURL");

// Find in arr of object of arr of object an id
function findAndCheck(id, arr) {
  let result = [];
  arr.forEach((post) => {
    for (let i = 0; i < post.tag.length; i++) {
      let stringId = JSON.stringify(post.tag[i]);
      stringId = stringId.replace(/['"]+/g, "");
      if (stringId == id) result.push({ id: post._id, type: "post" });
    }
  });
  return result;
}

// GET ALL async await
const tags_get_all = async (req, res, next) => {
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const foundTags = await Tag.find().select("_id name").sort({ name: 1 });
    const count = foundTags.length;
    // mongoose
    const foundPosts = await Post.find({
      available: true,
    }).select("_id tag");
    const data = foundTags.map((tag) => {
      return {
        id: tag._id,
        type: "tag",
        attributes: {
          id: tag._id,
          name: tag.name,
        },
        relationships: {
          posts: {
            data: findAndCheck(tag._id, foundPosts),
          },
        },
        links: { self: fullUrl + "/" + tag._id },
      };
    });
    const meta = { count, type: "GET", message: "Tags found" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  tags_get_all,
};
