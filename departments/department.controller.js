// departments/departments.controller.js
const express = require('express');
const router = express.Router();
const departmentService = require('./department.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  departmentService.getAll()
    .then(departments => res.json(departments))
    .catch(next);
}

function getById(req, res, next) {
  departmentService.getById(req.params.id)
    .then(department => department ? res.json(department) : res.sendStatus(404))
    .catch(next);
}

function create(req, res, next) {
  departmentService.create(req.body)
    .then(department => res.json(department))
    .catch(next);
}

function update(req, res, next) {
  departmentService.update(req.params.id, req.body)
    .then(department => res.json(department))
    .catch(next);
}

function _delete(req, res, next) {
  departmentService.delete(req.params.id)
    .then(() => res.json({ message: 'Department deleted successfully' }))
    .catch(next);
}
