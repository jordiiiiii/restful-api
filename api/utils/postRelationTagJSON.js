// relationships tags in data if tag exist
const tags = (obj, fullUrl) => {
  if (obj.tag) {
    const data = obj.tag.map((post) => {
      return {
        id: post._id,
        type: "tag",
      };
    });
    const links = {
      self: fullUrl + "/relationships/tags",
      related: fullUrl + "/tags",
    };
    return { data, links };
  }
};

module.exports = {
  tags,
};
