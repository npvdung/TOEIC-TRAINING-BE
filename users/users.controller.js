const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const jwt = require("jsonwebtoken");
const userService = require("./user.service");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const appRoot = require("app-root-path");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const AVATAR_PATH = "./images/avatar";
const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

const storageAvatar = multer.diskStorage({
  destination: AVATAR_PATH,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const uploadAvatar = multer({
  storage: storageAvatar,
});

// routes
router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", registerSchema, register);
router.get("/", authorize(), getAll);
router.get("/current", authorize(), getCurrent);
router.get("/:id", authorize(), getById);
router.get("/:userId/groups", authorize(), getAllGroupByUserId);
router.post(
  "/profile/avatars",
  authorize(),
  uploadAvatar.single("file"),
  updateAvatar
);
router.get("/profile/avatars/:avatarName", authorize(), getAvatar);

router.put(
  "/role-activate",
  authorize(),
  updateRoleAndIsActivatedSchema,
  updateRoleAndIsActivated
);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);
router.post("/forget-password", forgetPassword);
router.get("/reset-password/:id/:token", renderResetPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.post("/change-password/:id", changePassword);

module.exports = router;

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      res.json({
        code: 200,
        message: "Authentication successfully ",
        data: user,
      })
    )
    .catch(next);
}

function registerSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() =>
      res.json({
        code: 200,
        message: "Registration successful",
      })
    )
    .catch(next);
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) =>
      res.json({
        code: 200,
        message: "Successfully",
        data: users,
      })
    )
    .catch(next);
}

function getCurrent(req, res, next) {
  res.json(req.user);
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) =>
      res.json({
        code: 200,
        message: "Successfully",
        data: user,
      })
    )
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    email: Joi.string().empty(""),
    avatar: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then((user) =>
      res.json({
        code: 200,
        message: "User updated successfully",
        data: user,
      })
    )
    .catch(next);
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() =>
      res.json({
        code: 200,
        message: "User deleted successfully",
      })
    )
    .catch(next);
}

function updateRoleAndIsActivatedSchema(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().required(),
    role: Joi.number().required(),
    isActivated: Joi.boolean().required(),
  });
  validateRequest(req, next, schema);
}

function updateRoleAndIsActivated(req, res, next) {
  userService
    .updateRoleAndIsActivated(req.body)
    .then((user) =>
      res.json({
        code: 200,
        message: "User updated successfully",
        data: user,
      })
    )
    .catch(next);
}

function getAllGroupByUserId(req, res, next) {
  userService
    .getAllByUserId(req.params.userId)
    .then((data) =>
      res.json({
        code: 200,
        message: "Created successfully",
        data: data,
      })
    )
    .catch(next);
}

async function forgetPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await userService.getByEmail(email);
    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }
    const secret = JWT_SECRET + user.password;
    const token = jwt.sign({ email: user.email, id: user.id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:8888/users/reset-password/${user.id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "toeictraining1@gmail.com",
        pass: "uxgvuklnlknilvny",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("Email sent successfully");
  } catch (error) {
    console.log(error, "res");
    return res.status(500).json({ status: "Internal server error" });
  }
}

async function renderResetPassword(req, res) {
  const { id, token } = req.params;
  const user = await userService.getById(id);
  if (!user) {
    return res.status(404).json({ status: "User not found" });
  }
  const secret = JWT_SECRET + user.password;
  try {
    const verify = jwt.verify(token, secret);

    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    res.send("Not Verified");
  }
}

async function resetPassword(req, res) {
  const { id, token } = req.params;
  const { password } = req.body;
  const user = await userService.getById(id);

  if (!user) {
    return res.status(404).json({ status: "User not found" });
  }

  const secret = JWT_SECRET + user.password;

  try {
    const verify = jwt.verify(token, secret);

    await userService.update(id, { password: password });
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    return res.status(500).json({ status: "Internal server error" });
  }
}

async function changePassword(req, res) {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await userService.getUserWithHash(id);

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.hash);

    if (!isPasswordMatch) {
      return res.status(401).json({ status: "Incorrect old password" });
    }

    const updatedUser = await userService.update(id, { password: newPassword });

    if (updatedUser) {
      return res.json({ status: "Password updated successfully" });
    } else {
      return res.status(401).json({ status: "Failed to update password" });
    }
  } catch (error) {
    console.log(error, "err");
    return res.status(500).json({ status: "Internal server error" });
  }
}

async function updateAvatar(req, res, next) {
  const userId = req.user.id;
  const avatarPath = req.file.filename;
  userService
    .updateAvatar(avatarPath, userId)
    .then((data) =>
      res.json({
        code: 200,
        message: "Created successfully",
        data: data,
      })
    )
    .catch(next);
}

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

async function getAvatar(req, res, next) {
  const avatarPath = path.join(
    global.appRoot,
    AVATAR_PATH,
    req.params.avatarName
  );
  res.sendFile(avatarPath);
}
