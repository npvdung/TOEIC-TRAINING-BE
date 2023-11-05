const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../_middleware/validate-request')
const authorize = require('../_middleware/authorize')

const readingService = require('./reading.service')

router.post(
  '/',
  authorize(),
  createReadingQuestionSchema,
  createReadingQuestion
)
router.put('/', authorize(), updateReadingQuestionSchema, updateReadingQuestion)
router.delete('/:id', authorize(), deleteReading)
module.exports = router
function createReadingQuestionSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().allow('', null),
    paragraph: Joi.string().required(),
    translate: Joi.string().allow('', null),
    categoryId: Joi.number().required(),
    level: Joi.number().required(),
    questionList: Joi.array().items({
      explanation: Joi.string().allow('', null),
      questionName: Joi.string().allow('', null),
      questionType: Joi.number().required(),
      questionTitle: Joi.string().allow('', null),
      questionContent: Joi.string().required(),
      questionDescription: Joi.string().allow('', null),
      questionLevel: Joi.number().required(),
      questionCategory: Joi.number().required(),
      questionAnswer: Joi.string().required(),
      questionPoint: Joi.number().required(),
      createdBy: Joi.number().required(),
    }),
  })
  validateRequest(req, next, schema)
}

function createReadingQuestion(req, res, next) {
  readingService
    .create(req.body)
    .then(() =>
      res.json({
        code: 200,
        message: 'Created successfully',
        data: [],
      })
    )
    .catch(next)
}

function updateReadingQuestionSchema(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().allow('', null),
    paragraph: Joi.string().required(),
    translate: Joi.string().allow('', null),
    categoryId: Joi.number().required(),
    level: Joi.number().required(),
    questionList: Joi.array().items({
      id: Joi.number(),
      explanation: Joi.string().allow('', null),
      questionName: Joi.string().allow('', null),
      questionType: Joi.number().required(),
      questionTitle: Joi.string().allow('', null),
      questionContent: Joi.string().required(),
      questionDescription: Joi.string().allow('', null),
      questionLevel: Joi.number().required(),
      questionCategory: Joi.number().required(),
      questionAnswer: Joi.string().required(),
      questionPoint: Joi.number().required(),
      createdBy: Joi.number().required(),
    }),
  })
  validateRequest(req, next, schema)
}

function updateReadingQuestion(req, res, next) {
  readingService
    .update(req.body)
    .then(() =>
      res.json({
        code: 200,
        message: 'Created successfully',
        data: [],
      })
    )
    .catch(next)
}

function deleteReading(req, res, next) {
  readingService
    .delete(req.params.id)
    .then(() =>
      res.json({
        code: 200,
        message: 'Deleted successfully',
      })
    )
    .catch(next)
}
