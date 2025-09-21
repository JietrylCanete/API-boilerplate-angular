// employees/employee.service.js
const db = require('_helpers/db');

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await db.Employee.findAll({
    include: [{ model: db.Department }]
  });
}

async function getById(id) {
  return await getEmployee(id);
}

async function create(params) {
  // check if email exists
  if (await db.Employee.findOne({ where: { email: params.email } })) {
    throw `Employee with email ${params.email} already exists`;
  }
  return await db.Employee.create(params);
}

async function update(id, params) {
  const employee = await getEmployee(id);
  Object.assign(employee, params);
  await employee.save();
  return employee;
}

async function _delete(id) {
  const employee = await getEmployee(id);
  await employee.destroy();
}

async function getEmployee(id) {
  const employee = await db.Employee.findByPk(id);
  if (!employee) throw 'Employee not found';
  return employee;
}
