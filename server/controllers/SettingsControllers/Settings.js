const Model = require("../../models/SettingsModel/Settings.js");
const Email = require("../MusicControllers/Utils/Utils.js");

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

    const message = `Forgot your password? Submit your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

    await Email.sendEmail({
      email: req.body.email,
      subject: "Reset Password",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    await Model.resetPasswordModel(req);
    res.status(201).json({ message: "Password Reset." });
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
