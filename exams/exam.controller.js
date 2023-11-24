const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const authorize = require("../_middleware/authorize");
const examService = require("./exam.service");
const questionService = require("../questions/question.service");
const groupService = require("../groups/groups.service");

// routes
router.post("/", authorize(), createExamSchema, createExam);
router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.get("/getListExamByCategory/:categoryId", authorize(), getListExamByCategory);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);
router.post("/getQuestionsByExam", authorize(), getQuestionsByExam);
router.post("/getExamByUser", authorize(), getExamByUser);
router.post("/generate-random-exam", authorize(), generateRandomExamSchema, generateRandomExam);


module.exports = router;

function createExamSchema(req, res, next) {
    const schema = Joi.object({
        examName: Joi.string().required(),
        totalPoint: Joi.number().required(),
        userId: Joi.number().required(),
        totalTime: Joi.number().required(),
        categoryId: Joi.number().required(),
        listQuestion: Joi.string().required(),
        groupId: Joi.number()
    });
    validateRequest(req, next, schema);
}

function createExam(req, res, next) {
    examService
        .create(req.body)
        .then(() =>
            res.json({
                code: 200,
                message: "Created exam successfully",
                data: [],
            })
        )
        .catch(next);
}

function getAll(req, res, next) {
    let groupId;
    if (req.query.groupId) {
        groupId = req.query.groupId;
    } else {
        groupId = null;
    }
    examService
        .getAll(groupId)
        .then((exams) =>
            res.json({
                code: 200,
                message: "Get exam successfully",
                data: exams,
            })
        )
        .catch(next);
}

function getById(req, res, next) {
    examService
        .getById(req.params.id)
        .then((exam) =>
            res.json({
                code: 200,
                message: "get exam successfully",
                data: exam,
            })
        )
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        examName: Joi.string().empty(""),
        totalPoint: Joi.number().empty(""),
        userId: Joi.number().empty(""),
        totalTime: Joi.number().empty(""),
        categoryId: Joi.number().empty(""),
        listQuestion: Joi.string().empty(""),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    examService
        .update(req.params.id, req.body)
        .then((exam) =>
            res.json({
                code: 200,
                message: "Update exam successfully",
                data: exam,
            })
        )
        .catch(next);
}

function _delete(req, res, next) {
    examService
        .delete(req.params.id)
        .then(() =>
            res.json({
                code: 200,
                message: "Deleted successfully",
            })
        )
        .catch(next);
}

function getQuestionsByExam(req, res, next) {
    let {examId} = req.body;

    questionService
        .getAllByParams({where: {questionExam: examId}})
        .then((exams) =>
            res.json({
                code: 200,
                message: "Get exam successfully",
                data: exams,
            })
        )
        .catch(next);
}

async function getListExamByCategory(req, res, next) {
    const categoryId = req.params.categoryId;

    examService
        .getAllByParams({where: {categoryId: categoryId}})
        .then((exams) =>
            res.json({
                code: 200,
                message: "Get exam successfully",
                data: exams,
            })
        )
        .catch(next);
}

function getExamByUser(req, res, next) {
    let {userId} = req.body;

    examService
        .getAllByParams({where: {userId: userId}})
        .then((exams) =>
            res.json({
                code: 200,
                message: "Get exam successfully",
                data: exams,
            })
        )
        .catch(next);
}

function generateRandomExamSchema(req, res, next) {
    const schema = Joi.object({
        categoryId: Joi.number().required(),
        level: Joi.number(),
        quantity: Joi.number().required(),
        type: Joi.number().required()
    });
    validateRequest(req, next, Joi.array().items(schema).min(1));
}

function generateRandomExam(req, res, next) {
    examService
        .generateRandomExam(req.body)
        .then((exam) =>
            res.json({
                code: 200,
                message: "Get exam successfully",
                data: exam,
            })
        )
        .catch(next);
}

