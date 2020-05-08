const NodeCache = require("node-cache");
const Model = require("../../../models/MusicModel/ApiCalls/ApiCalls.js");

const Cache = new NodeCache();

exports.getChartData = async (req, res) => {
  try {
    const exists = Cache.has("ApiData");
    if (exists) {
      res.status(200).json({ ...Cache.get("ApiData") });
    } else {
      const finalResult = await Model.getChartDataModel();
      Cache.set("ApiData", { ...finalResult }, 691200);
      res.status(200).json({ ...finalResult });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
