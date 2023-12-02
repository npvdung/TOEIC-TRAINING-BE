const groupService = require("./groups.service");
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validateRequest = require('../_middleware/validate-request')
const authorize = require('../_middleware/authorize')


router.post('/', authorize(), createGroupSchema, createGroupQuestion)
router.post('/join', authorize(), joinGroupSchema, joinGroup)
router.get('/:groupId/users', authorize(), getAllUserByGroupId)
router.delete('/:groupId', authorize(), deleteGroup)
router.delete('/:groupId/users/:userId', authorize(), removeUserFromGroup)

module.exports = router;
function createGroupSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        ownerId: Joi.number().required()
    })
    validateRequest(req, next, schema)
}

function createGroupQuestion(req, res, next) {
    groupService
        .create(req.body)
        .then((data) =>
            res.json({
                code: 200,
                message: 'Created successfully',
                data: data,
            })
        )
        .catch(next)
}

function joinGroupSchema(req, res, next) {
    const schema = Joi.object({
        code: Joi.string().required(),
        userId: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

async function joinGroup(req, res, next) {
    let body = req.body;
    const group = await groupService.findByCode(body.code);
    if (group == null) {
        res.json({
            code: 400,
            message: 'Group not found'
        });
        return;
    }
    const existsInGroup = await groupService.existsInGroup(group.id, body.userId);
    if (existsInGroup) {
        res.json({
            code: 400,
            message: 'User is already in the group'
        });
        return;
    }
    let joinInfo = {
        userId: body.userId,
        groupId: group.id
    }
    groupService
        .join(joinInfo)
        .then((data) =>
            res.json({
                code: 200,
                message: 'Created successfully'
            })
        )
        .catch(next)
}

async function getAllUserByGroupId(req, res, next) {
    groupService
        .getAllUserByGroupId(req.params.groupId)
        .then((data) =>
            res.json({
                code: 200,
                message: 'Created successfully',
                data: data
            })
        )
        .catch(next)
}

async function deleteGroup(req, res, next) {
    groupService
        .deleteGroup(req.params.groupId)
        .then((data) =>
            res.json({
                code: 204,
                message: 'Created successfully'
            })
        )
        .catch(next)
}

async function removeUserFromGroup(req, res, next) {
    groupService
        .removeUserFromGroup(req.params.groupId, req.params.userId)
        .then((data) =>
            res.json({
                code: 204,
                message: 'Created successfully'
            })
        )
        .catch(next)
}

