// _helpers/db.js
const { Sequelize } = require('sequelize');
const config = require('config.json');

// Use the properties inside config.database
const sequelize = new Sequelize(
  config.database.database,   // Database name as string
  config.database.user,       // DB username
  config.database.password,   // DB password
  {
    host: config.database.host,
    port: config.database.port, // optional, default is 3306
    dialect: 'mysql',
    logging: false
  }
);


const db = {};

// Models
db.Account = require('../accounts/account.model')(sequelize);
db.Employee = require('../employees/employee.model')(sequelize);
db.Department = require('../departments/department.model')(sequelize);
db.Request = require('../requests/request.model')(sequelize);
db.RequestItem = require('../requests/requestItem.model')(sequelize);
db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);

// Associations
db.Employee.belongsTo(db.Department, { foreignKey: 'departmentId' });
db.Request.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'employee' });
db.Request.hasMany(db.RequestItem, { foreignKey: 'requestId', as: 'items' });
db.RefreshToken.belongsTo(db.Account, { foreignKey: 'accountId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync DB (update tables to match models)
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // ALTER tables to match models without dropping data
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

module.exports = db;
