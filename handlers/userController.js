const User = require("../pkg/users/userSchema");

exports.getUsers = async (req, res) => {
  try {
    console.log("req.auth", req.auth);
    if (req.auth.role === "admin") {
      const users = await User.find();
      return res.status(200).send(users);
    } else {
      return res.status(403).send("Forbidden!");
    }
  } catch (err) {
    console.log("error", err);
    return res.status(500).send("Internal server error!");
  }
};
