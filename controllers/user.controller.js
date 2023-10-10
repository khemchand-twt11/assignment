const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const cloudinary = require("../config/cloudinary");
async function enterUserDetails(req, res) {
  const { user_name, user_email, user_password, total_orders } = req.body;
  try {
    const newUser = {
      user_name,
      user_email,
      total_orders,
    };

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user_password, saltRounds);

    newUser.user_password = hashedPassword;

    if (!req.file) {
      return res.status(400).send({ message: "No image file provided." });
    }

    cloudinary.v2.uploader
      .upload_stream(
        { resource_type: "auto", folder: "assignment" },
        async (error, result) => {
          if (error) {
            return res.status(500).send({ message: "Image upload failed." });
          }
          newUser.user_image = result.secure_url;

          try {
            const user = await User.create(newUser);

            res.json({ message: "User created successfully" });
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          }
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserDetails(req, res) {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({ where: { user_id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUserDetails(req, res) {
  const { user_name, user_email, user_image, total_orders } = req.body;
  const userId = req.user.user_id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.user_name = user_name || user.user_name;
    user.user_email = user_email || user.user_email;
    user.user_image = user_image || user.user_image;
    user.total_orders = total_orders || user.total_orders;

    await user.save();

    res.json({ message: "User details updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginUser(req, res) {
  const { user_email, user_password } = req.body;

  try {
    const user = await User.findOne({ where: { user_email } });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ user_id: user.user_id }, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserImage(req, res) {
  const { user_id } = req.params;

  try {
    const user = await User.findByPk(user_id);

    if (!user || !user.user_image) {
      return res.status(404).json({ message: "User image not found" });
    }

    res.json({ user_image: user.user_image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUser(req, res) {
  const { user_id } = req.params;

  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  enterUserDetails,
  getUserDetails,
  updateUserDetails,
  loginUser,
  getUserImage,
  deleteUser,
};
