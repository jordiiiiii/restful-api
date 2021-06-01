const Post = require("../../models/Post");
const utilsURL = require("../../utils/getURL");
const utilsPostObj = require("../../utils/postJSON");
// const utilsPostRelTagObj = require("../../utils/postRelationTagJSON");

// GET BY ID async await
const posts_get_post = async (req, res, next) => {
  const id = req.params.id;
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const foundPosts = await Post.find({ available: true })
      .select("available _id creator tag")
      .populate("creator tag", "_id");
    // mongoose
    const foundPost = await Post.findById(id)
      .select("available _id title snippet body imageUrl creator tag createdAt")
      .populate("creator tag");
    if (!foundPost) {
      return res
        .status(404)
        .json({ message: "No valid entry found for provided ID" });
    }
    if (!foundPost.available) {
      return res
        .status(404)
        .json({ message: "No available entry found for provided ID" });
    }
    // json api data
    let data = utilsPostObj.data(foundPost, fullUrl);
    // // relationships tags in data if tag exist
    // const tags = utilsPostRelTagObj.tags(foundPost, fullUrl);
    // if (foundPost.tag) {
    //   data.relationships.tags = tags;
    // }
    // included
    let included = [];
    // included tag if exist
    if (foundPost.tag) {
      included = foundPost.tag.map((tag) => {
        return {
          id: tag._id,
          type: "tag",
          attributes: {
            name: tag.name,
          },
          relationships: {
            posts: {
              data: foundPosts
                .filter((post) =>
                  post.tag
                    .map((tag) => {
                      return tag._id;
                    })
                    .includes(tag._id)
                )
                .map((post) => {
                  return {
                    id: post._id,
                    type: "post",
                  };
                }),
            },
          },
        };
      });
    }
    // included creator
    included.push({
      id: foundPost.creator._id,
      type: "creator",
      attributes: {
        name: foundPost.creator.name,
        surnames: foundPost.creator.surnames,
      },
      relationships: {
        posts: {
          data: foundPosts
            .filter((p) => p.creator.id == foundPost.creator._id)
            .map((post) => {
              return {
                id: post._id,
                type: "post",
              };
            }),
        },
      },
    });

    const meta = { type: "GET", message: "Post found" };
    // response json
    res.status(200).json({ data, included, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  posts_get_post,
};

// const idPost = foundPost.id;
// const idTags = foundPost.tag.map((tag) => {
//   return tag._id;
// });
// const idTag = "609fbfc781649e5ca0046d10";
// console.log(
//   foundPosts
//     .filter((post) =>
//       post.tag
//         .map((tag) => {
//           return tag._id;
//         })
//         .includes(idTag)
//     )
//     .map((post) => {
//       return {
//         id: post._id,
//         type: "post",
//       };
//     })
// );
// const idTag = "609fbfc781649e5ca0046d10";
// let novaArray = [];
// foundPosts.forEach((post) => {
//   if (
//     post.tag
//       .map((tag) => {
//         return tag._id;
//       })
//       .includes(idTag)
//   ) {
//     novaArray.push({ id: post._id, type: "post" });
//   }
// });
// console.log(novaArray);
