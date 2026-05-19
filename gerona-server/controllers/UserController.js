const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE USER
const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // CHECK EXISTING EMAIL
    const existingEmail = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // CHECK EXISTING USERNAME
    const existingUsername = await User.findOne({
      username: username.toLowerCase(),
    });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      ...req.body,

      type: req.body.type || "viewer",

      email: email.toLowerCase(),

      username: username.toLowerCase(),

      password: hashedPassword,
    });

    // REMOVE PASSWORD FROM RESPONSE
    const userResponse = user.toObject();

    delete userResponse.password;

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user.",
    });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // HASH PASSWORD ONLY IF PROVIDED
    if (updateData.password) {
      updateData.password = await bcrypt.hash(
        updateData.password,
        10
      );
    } else {
      delete updateData.password;
    }

    // LOWERCASE EMAIL
    if (updateData.email) {
      updateData.email =
        updateData.email.toLowerCase();
    }

    // LOWERCASE USERNAME
    if (updateData.username) {
      updateData.username =
        updateData.username.toLowerCase();
    }

    // CHECK DUPLICATE EMAIL
    if (updateData.email) {
      const existingEmail =
        await User.findOne({
          email: updateData.email,
          _id: { $ne: req.params.id },
        });

      if (existingEmail) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    // CHECK DUPLICATE USERNAME
    if (updateData.username) {
      const existingUsername =
        await User.findOne({
          username: updateData.username,
          _id: { $ne: req.params.id },
        });

      if (existingUsername) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }
    }

    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      ).select("-password");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // USER NOT FOUND
    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    // INACTIVE ACCOUNT
    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is inactive. Please contact support.",
      });
    }

    // CHECK PASSWORD FIRST
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // WRONG PASSWORD
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // BLOCK VIEWERS
    if (user.type === "viewer") {
      return res.status(403).json({
        message: "Viewer accounts are not allowed to login.",
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        type: user.type,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      message: "Login successful",
      token,

      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        type: user.type,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
