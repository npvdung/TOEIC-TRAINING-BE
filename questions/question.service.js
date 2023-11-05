const { Op } = require('sequelize')
const db = require('../_helpers/db')
const readingService = require('../reading/reading.service')

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getAllByParams: getAllByParams,
  getAllReadingQuestion,
}

async function getAll() {
  return db.Question.findAll()
}

async function getAllByParams(params) {
  return db.Question.findAll(params)
}

async function getAllReadingQuestion() {
  // const questionPromise = getAllByParams({
  //   where: { readingId: { [Op.ne]: null } },
  // });
  // const readingPromise = readingService.getAll();

  // const [questionList, readingList] = await Promise.all([
  //   questionPromise,
  //   readingPromise,
  // ]);
  // readingList.questionList = questionList;

  // return Promise.all([questionPromise, readingPromise]).then(
  //   ([questionList, readingList]) => {
  //     console.log("question111", questionList);
  //     console.log("reading111", readingList);
  //     readingList.questionList = questionList;
  //     return readingList;
  //   }
  // );
  return readingService.getAll().then(async (readingList) => {
    let result = []
    for (let reading of readingList) {
      const questionList = await getAllByParams({
        where: { readingId: reading.id },
      })
      reading['questionList'] = questionList
      result.push({ ...reading, questionList: questionList })
    }
    return result
  })
}

async function getById(id) {
  return await getQuestion(id)
}

async function create(params) {
  // validate

  // save question
  await db.Question.create(params)
}

async function update(id, params) {
  const question = await getQuestion(id)

  // copy params to user and save
  Object.assign(question, params)
  await question.save()

  return question.get()
}

async function _delete(id) {
  const question = await getQuestion(id)
  await question.destroy()
}

// helper functions

async function getQuestion(id) {
  const question = await db.Question.findByPk(id)
  if (!question) throw 'Question not found'
  return question
}
