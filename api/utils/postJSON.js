// convert response create db Object to response json api
const data = (obj, fullUrl) => ({
  id: obj._id,
  type: "post",
  attributes: {
    id: obj._id,
    title: obj.title,
    snippet: obj.snippet,
    body: obj.body,
    imageUrl: obj.imageUrl,
    createdAt: obj.createdAt,
  },
  relationships: {
    tags: {
      data: obj.tag.map((tag) => {
        return { id: tag._id, type: "tag" };
      }),
    },
    creators: {
      data: {
        id: obj.creator._id,
        type: "creator",
      },
      links: {
        self: fullUrl + "/relationships/creators",
        related: fullUrl + "/creators",
      },
    },
  },
  links: { self: fullUrl + "/" + obj._id },
});

module.exports = {
  data,
};
