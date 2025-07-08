const User = require("../pkg/users/userSchema");

exports.getUsers = async (req, res) => {
  try {
    if (req.auth.role === "admin") {
      const users = await User.find();
      return res.status(200).send(users);
    } else {
      return res.status(403).send("Access forbidden!");
    }
  } catch (err) {
    return res.status(500).send("Internal server error!");
  }
};
