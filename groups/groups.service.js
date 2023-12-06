const db = require("../_helpers/db");
const { Sequelize, QueryTypes } = require("sequelize");
module.exports = {
  create: create,
  findByCode: findByCode,
  join: join,
  existsInGroup: existsInGroup,
  getAllUserByGroupId: getAllUserByGroupId,
  deleteGroup: deleteGroup,
  removeUserFromGroup: removeUserFromGroup,
};

async function create(params) {
  const CODE_LENGTH = 7;
  const code = generateCode(CODE_LENGTH);
  params.code = code;
  return await db.Group?.create(params).then((group) => {
    join({
      groupId: group.id,
      userId: params.ownerId,
    });
  });
}

function generateCode(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function join(params) {
  return await db.sequelize.query(
    "INSERT INTO `groupUser` (groupId, userId) VALUES (:groupId, :userId)",
    {
      replacements: {
        groupId: params.groupId,
        userId: params.userId,
      },
    }
  );
}

async function findByCode(code) {
  const result = await db.Group.findOne({ where: { code: code } });
  return result.dataValues;
}

async function existsInGroup(groupId, userId) {
  return db.sequelize
    ?.query(
      "SELECT 1 FROM `groupUser` WHERE groupId = :groupId AND userId = :userId",
      {
        replacements: {
          groupId: groupId,
          userId: userId,
        },
        type: QueryTypes.SELECT,
      }
    )
    .then((result) => result.length > 0);
}

async function getAllUserByGroupId(groupId) {
  return db.sequelize?.query(
    "SELECT u.* FROM groupUser gu JOIN users u ON gu.userId = u.id  WHERE gu.groupId = :groupId",
    {
      replacements: {
        groupId: groupId,
      },
      type: QueryTypes.SELECT,
    }
  );
}

async function deleteGroup(groupId) {
  return db.sequelize?.query(
    "DELETE FROM `groups` WHERE id = :groupId; DELETE FROM `groupUser` WHERE groupId = :groupId",
    {
      replacements: {
        groupId: groupId,
      },
    }
  );
}

async function removeUserFromGroup(groupId, userId) {
  return db.sequelize?.query(
    "DELETE FROM `groupUser` WHERE groupId = :groupId AND userId = :userId",
    {
      replacements: {
        groupId: groupId,
        userId: userId,
      },
    }
  );
}
