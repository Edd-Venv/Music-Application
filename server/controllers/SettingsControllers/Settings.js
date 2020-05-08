const Model = require("../../models/SettingsModel/Settings.js");

exports.changeUserPassWord = async (req, res) => {
  try {
    await Model.changeUserPasswordModel(req);
    res.status(201).json({ message: "Password Changed." });
  } catch (error) {
    res.status(404).json({ error: "Password Not Changed." });
  }
};

exports.changeUserName = async (req, res) => {
  try {
    await Model.changeUserNameModel(req);
    res.status(201).json({ message: "User Name Updated" });
  } catch (error) {
    res.status(404).json({ error: "User Name Not Updated!" });
  }
};

exports.updateUserImage = async (req, res) => {
  try {
    await Model.updateUserImageModel(req, res);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await Model.deleteUserModel(req);
    res.status(204).json({ message: "User Deleted." });
  } catch (error) {
    res.status(404).send({ error: "User Not Deleted." });
  }
};
