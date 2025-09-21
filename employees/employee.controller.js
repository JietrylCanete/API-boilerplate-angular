// employees/employees.controller.js
const express = require('express');
const router = express.Router();
const employeeService = require('./employee.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  employeeService.getAll()
    .then(employees => res.json(employees))
    .catch(next);
}

function getById(req, res, next) {
  employeeService.getById(req.params.id)
    .then(employee => employee ? res.json(employee) : res.sendStatus(404))
    .catch(next);
}

function create(req, res, next) {
  employeeService.create(req.body)
    .then(employee => res.json(employee))
    .catch(next);
}

function update(req, res, next) {
  employeeService.update(req.params.id, req.body)
    .then(employee => res.json(employee))
    .catch(next);
}

function _delete(req, res, next) {
  employeeService.delete(req.params.id)
    .then(() => res.json({ message: 'Employee deleted successfully' }))
    .catch(next);
}





