const Post = require("../../models/Post");
const Tag = require("../../models/Tag");
const utilsURL = require("../../utils/getURL");

// GET ALL async await
const posts_get_all = async (req, res, next) => {
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const foundPosts = await Post.find({ available: true })
      .select("available _id title snippet body imageUrl createdAt creator tag")
      .populate("creator tag")
      .sort({ createdAt: -1 });
    const foundTags = await Tag.find().select("name");
    const count = foundPosts.length;
    // json api data
    const data = foundPosts.map((post) => {
      return {
        id: post._id,
        type: "post",
        attributes: {
          id: post._id,
          title: post.title,
          snippet: post.snippet,
          body: post.body,
          imageUrl: post.imageUrl,
          createdAt: post.createdAt,
        },
        relationships: {
          tags: {
            data: post.tag.map((tag) => {
              return { id: tag._id, type: "tag" };
            }),
          },
          creators: {
            data: {
              id: post.creator._id,
              type: "creator",
            },
            links: {
              self: fullUrl + "/" + post._id + "relationships/creators",
              related: fullUrl + "/" + post._id + "/creators",
            },
          },
        },
        links: { self: fullUrl + "/" + post._id },
      };
    });
    // 1r Fer un Map de els creadors
    const includeNoReduce = foundPosts.map((post) => {
      return {
        id: post.creator._id,
        type: "creator",
        attributes: {
          name: post.creator.name,
          surnames: post.creator.surnames,
        },
        relationships: {
          posts: {
            data: [],
          },
        },
      };
    });
    // 2n Eliminar duplicitats
    let included = includeNoReduce.filter(
      (arr, index, self) => index === self.findIndex((t) => t.id === arr.id)
    );
    // 3r Crear un json on la key=idPost i value=idCreator
    const relations = data.map((relation) => {
      return {
        [relation.id]: relation.relationships.creators.data.id,
      };
    });
    // 4t Reduce d'array d'objectes([{:},{:},{:}]) a objecte ({:,:,:})
    let obj = { relations };
    const result = obj.relations.reduce((acc, curr) => {
      for (let key in curr) {
        acc[key] = curr[key];
      }
      return acc;
    }, {});
    // // 5e Relacionar cada idCreator amb tots els idPosts//al final no es necesssari
    // const postsById = Object.keys(result).reduce(
    //   (acc, k) => ((acc[result[k]] = [...(acc[result[k]] || []), k]), acc),
    //   {}
    // );
    // 6e Modificar included per afegir les relacions (included + postsById)
    included.forEach(function (element) {
      for (const [key, value] of Object.entries(result)) {
        // console.log(`${key} ${value}`);
        if (value === element.id) {
          element.relationships.posts.data.push({
            id: key,
            type: "post",
          });
        }
      }
    });
    // relacions entre tags i posts
    if (foundTags) {
      const data = foundTags.map((tag) => {
        return {
          id: tag._id,
          type: "tag",
          attributes: {
            name: tag.name,
          },
          relationships: {
            posts: {
              data: [],
            },
          },
        };
      });
      data.forEach((element) => {
        for (let i = 0; i < foundPosts.length; i++) {
          for (let j = 0; j < foundPosts[i].tag.length; j++) {
            let tagA = String(element.id);
            let tagB = String(foundPosts[i].tag[j]._id);
            if (tagA === tagB) {
              element.relationships.posts.data.push({
                id: foundPosts[i]._id,
                type: "post",
              });
            }
          }
        }
      });
      included = included.concat(data);
    }
    const meta = { count, type: "GET", message: "Posts found" };
    // response json
    res.status(200).json({ data, included, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  posts_get_all,
};

// // GET ALL async await
// const posts_get_all = async (req, res, next) => {
//   try {
//     // mongoose
//     const foundPosts = await Post.find();
//     const count = foundPosts.length;
//     res.status(200).json({ count, foundPosts });
//   } catch (err) {
//     next(err);
//   }
// };
