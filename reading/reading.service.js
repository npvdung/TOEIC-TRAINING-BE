const db = require("../_helpers/db");

module.exports = {
  create: create,
  getAllByParams: getAllByParams,
  update: update,
  delete: _delete,
  getAll,
};

function create(params) {
  return db.Reading.create(params)
}

async function update(params) {
  db.Reading.update(params, { where: { id: params.id } })
    .then(() => {
      for (let question of params.questionList) {
        if (question.id == null) {
          const temp = { ...question, readingId: params.id };
          db.Question.create(temp);
        } else {
          db.Question.update(
            { ...question, readingId: params.id },
            { where: { id: question.id } }
          );
        }
      }
    })
    .catch((err) => {});
}

async function getAllByParams(params) {
  return await db.Reading.findAll(params);
}

async function _delete(id) {
  db.Question.destroy({
    where: {
      readingId: id,
    },
  });
  db.Reading.destroy({
    where: {
      id: id,
    },
  });
}

async function getAll() {
  return db.Reading.findAll({raw: true});
}
