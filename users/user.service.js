const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const { QueryTypes } = require("sequelize");
const fs = require("fs");
module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getByEmail,
  getUserWithHash,
  updateRoleAndIsActivated,
  getAllByUserId: getAllByUserId,
  updateAvatar: updateAvatar,
};

async function authenticate({ username, password }) {
  const user = await db.User.scope("withHash").findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.hash)))
    throw "Username or password is incorrect";

  // authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });
  return { ...omitHash(user.get()), token };
}

async function getAll() {
  return await db.User.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function getByEmail(email) {
  const user = await db.User.findOne({ where: { email } });
  if (!user) throw "User not found";
  return user;
}

async function getUserWithHash(id) {
  try {
    const user = await db.User.scope("withHash").findOne({ where: { id } });

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

async function create(params) {
  // validate
  if (await db.User.findOne({ where: { username: params.username } })) {
    throw 'Username "' + params.username + '" is already taken';
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // const fileData = await fs.readFileSync()
  // save user
  await db.User.create({ ...params, role: 1 });
}

async function update(id, params) {
  const user = await getUser(id);

  // validate
  const usernameChanged = params.username && user.username !== params.username;
  if (
    usernameChanged &&
    (await db.User.findOne({ where: { username: params.username } }))
  ) {
    throw 'Username "' + params.username + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}

async function updateRoleAndIsActivated(body) {
  console.log(body);
  db.User.update(
    {
      role: body.role,
      isActivated: body.isActivated,
    },
    {
      where: {
        id: body.id,
      },
    }
  );
}

async function getAllByUserId(userId) {
  return db.sequelize?.query(
    "SELECT g.* FROM `groupUser` gu LEFT JOIN `groups` g ON gu.groupId = g.id WHERE gu.userId = :userId",
    {
      replacements: {
        userId: userId,
      },
      type: QueryTypes.SELECT,
    }
  );
}

async function updateAvatar(avatarPath, userId) {
  db.User.update(
    {
      avatar: avatarPath,
    },
    {
      where: {
        id: userId,
      },
    }
  );
}
