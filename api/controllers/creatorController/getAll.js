const Creator = require("../../models/Creator");
const utilsURL = require("../../utils/getURL");

// GET ALL async await
const creators_get_all = async (req, res, next) => {
  const fullUrl = utilsURL.fullUrlFunction(req);

  try {
    // mongoose
    const foundCreators = await Creator.find()
      .select("_id name surnames position")
      .sort({ surnames: 1 });
    const count = foundCreators.length;
    // json api data
    const data = foundCreators.map((creator) => {
      return {
        id: creator._id,
        type: "creator",
        attributes: {
          id: creator._id,
          name: creator.name,
          surnames: creator.surnames,
          position: creator.position,
        },
        links: { self: fullUrl + "/" + creator._id },
      };
    });
    const meta = { count, type: "GET", message: "Creators found" };
    // response json
    res.status(200).json({ data, meta });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  creators_get_all,
};
