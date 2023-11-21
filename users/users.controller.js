const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const jwt = require("jsonwebtoken");
const userService = require("./user.service");
const bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");

// routes
router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", registerSchema, register);
router.get("/", authorize(), getAll);
router.get("/current", authorize(), getCurrent);
router.get("/:id", authorize(), getById);
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

async function forgetPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await userService.getByEmail(email);
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
    res.json({ error });
  }
}

async function renderResetPassword(req, res) {
  const { id, token } = req.params;
  const user = await userService.getById(id);
  if (!user) {
    return res.json({ status: "User Not Exists!!" });
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
    return res.json({ status: "User Not Exists!!" });
  }

  const secret = JWT_SECRET + user.password;

  try {
    const verify = jwt.verify(token, secret);

    await userService.update(id, { password: password });
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    res.send(error);
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
      return res.json({ status: "Failed to update password" });
    }
  } catch (error) {
    return res.status(500).json({ status: "Internal server error" });
  }
}
