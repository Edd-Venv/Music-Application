const Model = require("../../models/SettingsModel/Settings.js");
const Email = require("../MusicControllers/Utils/email.js");

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

exports.forgotPassword = async (req, res) => {
  try {
    const resetToken = await Model.forgotPasswordModel(req);
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/resetPassword/${resetToken}`;

    await new Email(req.body, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    await Model.resetPasswordModel(req);
    res.status(201).json({ status: "success", message: "Password Reset." });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
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
