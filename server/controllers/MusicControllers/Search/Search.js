const NodeCache = require("node-cache");
const Model = require("../../../models/MusicModel/Search/Search.js");

const Cache = new NodeCache();

exports.search = async (req, res) => {
  try {
    const exists = Cache.has(`${req.body.search_text}`);
    if (exists) {
      res.status(200).json({ ...Cache.get(`${req.body.search_text}`) });
    } else {
      const finalResult = await Model.searchModel(req);
      Cache.set(`${req.body.search_text}`, { ...finalResult }, 691200);
      res.status(200).json({ ...finalResult });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
