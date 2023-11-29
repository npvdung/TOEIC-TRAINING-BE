const db = require("../_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  delete: _delete,
  getAllByParams: getAllByParams,
  generateRandomExam: generateRandomExam,
};

async function getAllByParams(params) {
  return await db.Exam?.findAll(params);
}

async function getAll(groupId) {
  return await db.sequelize.query(
    "SELECT * FROM exams " +
      "WHERE CASE " +
      "WHEN :groupId IS NULL THEN groupId IS NULL " +
      "WHEN :groupId IS NOT NULL then groupId = :groupId END",
    {
      replacements: {
        groupId: groupId,
      },
      type: QueryTypes.SELECT,
    }
  );
}

async function getById(id) {
  return await getExam(id);
}

async function create(params) {
  await db.Exam.create(params);
}

async function update(id, params) {
  const exam = await getExam(id);

  Object.assign(exam, params);
  await exam.save();

  return exam.get();
}

async function _delete(id) {
  const exam = await getExam(id);
  await exam.destroy();
}

// helper functions

async function getExam(id) {
  // const exam = await db.Exam.findByPk(id);
  // if (!exam) {throw 'Exam not found';
  // return exam;
  return await db.Exam.findByPk(id);
}

// exports.generateRandomExam = (questionCategoryRequireList) => {
//     return Promise.all(questionCategoryRequireList
//         .map(async (questionCategoryRequire) => await getRandomQuestionByCategoryId(questionCategoryRequire)))
//     // for (let questionCategoryRequire of questionCategoryRequireList) {
//     //     getRandomQuestionByCategoryId(questionCategoryRequire);
//     // }
// }

async function generateRandomExam(questionCategoryRequireList) {
  let readingList = [];
  let query = "";
  let i = 1;
  let replacements = {};
  questionCategoryRequireList.sort((a, b) => a.categoryId - b.categoryId);
  for (let questionCategoryRequire of questionCategoryRequireList) {
    if (questionCategoryRequire.type == 1) {
      query +=
        " UNION (SELECT * " +
        " FROM questions " +
        " WHERE questionCategory = :categoryId" +
        i +
        " AND questionLevel = :questionLevel" +
        i +
        " ORDER BY RAND() " +
        " LIMIT :quantity" +
        i +
        ") ";
      replacements["categoryId" + i] = questionCategoryRequire.categoryId;
      replacements["questionLevel" + i] = questionCategoryRequire.level;
      replacements["quantity" + i] = questionCategoryRequire.quantity;
      i++;
    } else if (questionCategoryRequire.type == 2) {
      const [readingListQuery, metadata] = await db.sequelize.query(
        "SELECT * " +
          " FROM readings " +
          " WHERE categoryId = :categoryId AND level = :level " +
          " ORDER BY RAND() " +
          " LIMIT :quantity ",
        {
          replacements: {
            categoryId: questionCategoryRequire.categoryId,
            quantity: questionCategoryRequire.quantity,
            level: questionCategoryRequire.level,
          },
        }
      );
      readingList = readingList.concat(readingListQuery);
      let readingListQueryIdList = readingListQuery.map(
        (reading) => reading.id
      );
      let i = 0;
      readingListQueryIdList.forEach((id) => {
        query +=
          " UNION (SELECT * " +
          " FROM questions " +
          " WHERE readingId IN (:readingListQueryIdList" +
          i +
          ") " +
          " ORDER BY RAND()) ";
        replacements["readingListQueryIdList" + i] = id;
        i++;
      });
    }
  }
  query = query.slice(" UNION".length);
  query =
    "SELECT * FROM (" +
    query +
    ") as question ORDER BY questionCategory ASC, questionLevel ASC ";
  const [questionList, metadata] = await db.sequelize.query(query, {
    replacements: replacements,
  });
  const result = {
    readingList: readingList,
    questionList: questionList,
  };
  return result;
}

async function getRandomQuestionByCategoryId(questionCategoryRequire) {
  const [result, metadata] = await db.sequelize.query(
    "SELECT * " +
      "FROM questions " +
      "WHERE questionCategory = :categoryId AND questionLevel = :questionLevel " +
      "ORDER BY RAND() " +
      "LIMIT :quantity",
    {
      replacements: {
        categoryId: questionCategoryRequire.categoryId,
        questionLevel: questionCategoryRequire.level,
        quantity: questionCategoryRequire.quantity,
      },
    }
  );
  console.log("metadata: ", metadata);
  return result;
}
