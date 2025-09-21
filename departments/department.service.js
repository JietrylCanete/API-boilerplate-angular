// departments/department.service.js
const db = require('_helpers/db');

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await db.Department.findAll();
}

async function getById(id) {
  return await getDepartment(id);
}

async function create(params) {
  if (await db.Department.findOne({ where: { name: params.name } })) {
    throw `Department with name ${params.name} already exists`;
  }
  return await db.Department.create(params);
}

async function update(id, params) {
  const department = await getDepartment(id);
  Object.assign(department, params);
  await department.save();
  return department;
}

async function _delete(id) {
  const department = await getDepartment(id);
  await department.destroy();
}

async function getDepartment(id) {
  const department = await db.Department.findByPk(id);
  if (!department) throw 'Department not found';
  return department;
}
