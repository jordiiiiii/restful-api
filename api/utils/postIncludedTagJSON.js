// included tags in data if tag exist
const included = (obj) => {
  let included = [];
  // included tag if exist
  console.log(obj.tag);
  if (obj.tag) {
    included = obj.tag.map((post) => {
      return {
        id: post._id,
        type: "tag",
        attributes: {
          name: post.name,
        },
      };
    });
  }
  // included creator
  included.push({
    id: obj.creator._id,
    type: "creator",
    attributes: {
      name: obj.creator.name,
      surnames: obj.creator.surnames,
    },
  });
  return included;
};

module.exports = {
  included,
};
