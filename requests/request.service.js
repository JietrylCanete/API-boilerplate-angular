// requests/request.service.js
const db = require('../_helpers/db');

module.exports = {
  create,
  getAll,
  getById,
  update,
  delete: _delete
};

async function create(params) {
  // Create the request
  const request = await db.Request.create({
    title: params.title,
    employeeId: params.employeeId,
    status: 'Pending'
  });

  // If items exist, insert them
  if (params.items && params.items.length > 0) {
    for (const item of params.items) {
      await db.RequestItem.create({
        name: item.name,
        quantity: item.quantity,
        requestId: request.id
      });
    }
  }

  return await getById(request.id); // return with employee + items
}

async function getAll() {
  return await db.Request.findAll({
    include: [
      { model: db.Employee, as: 'employee' },
      { model: db.RequestItem, as: 'items' }
    ]
  });
}

async function getById(id) {
  return await db.Request.findByPk(id, {
    include: [
      { model: db.Employee, as: 'employee' },
      { model: db.RequestItem, as: 'items' }
    ]
  });
}

async function update(id, params) {
  const request = await getById(id);
  if (!request) throw 'Request not found';

  Object.assign(request, params);
  await request.save();

  return request;
}

async function _delete(id) {
  const request = await getById(id);
  if (!request) throw 'Request not found';

  await request.destroy();
}


