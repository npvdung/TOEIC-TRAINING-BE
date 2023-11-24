const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const userService = require("./user.service");
const groupService = require("../groups/groups.service");

// routes
router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", registerSchema, register);
router.get("/", authorize(), getAll);
router.get("/current", authorize(), getCurrent);
router.get("/:id", authorize(), getById);
router.get('/:userId/groups', authorize(), getAllGroupByUserId)

router.put(
  "/role-activate",
  authorize(),
  updateRoleAndIsActivatedSchema,
  updateRoleAndIsActivated
);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

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
                message: 'Created successfully',
                data: data
            })
        )
        .catch(next)
}